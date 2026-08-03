import { useState } from 'react'
import { ExternalLink, Menu, X } from 'lucide-react'

const base = import.meta.env.BASE_URL

function PageNavigation({ notes = false }: { notes?: boolean }) {
  const [open, setOpen] = useState(false)
  return <header className="site-header site-header--page">
    <a className="brand" href={base} aria-label="Oakwood Online home">
      <img className="brand-mark" src={`${base}assets/oakwood-emblem.webp`} alt="" width="44" height="44" />
      <span><strong>Oakwood</strong><small>Online</small></span>
    </a>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="page-nav" aria-label={open ? 'Close navigation' : 'Open navigation'} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    <nav id="page-nav" className={open ? 'main-nav main-nav--open' : 'main-nav'} aria-label="Main navigation">
      <a href={`${base}#world`} onClick={() => setOpen(false)}>The World</a>
      <a href={`${base}#features`} onClick={() => setOpen(false)}>Features</a>
      <a className={notes ? 'nav-current' : undefined} href={`${base}development/`} onClick={() => setOpen(false)}>Engineering Notes</a>
      <a href={`${base}#community`} onClick={() => setOpen(false)}>Community</a>
      <a className="nav-cta" href={`${base}#playtest`} onClick={() => setOpen(false)}>Steam Playtest</a>
    </nav>
  </header>
}

function PageFooter() {
  return <footer className="footer">
    <div className="page-shell footer__top">
      <a className="brand brand--footer" href={base}><img className="brand-mark" src={`${base}assets/oakwood-emblem.webp`} alt="" width="44" height="44" /><span><strong>Oakwood</strong><small>Online</small></span></a>
      <p>A medieval world built by hand.<br />An independent game in development.</p>
      <div className="footer__links"><a href="https://discord.gg/5wcUbVU58" target="_blank" rel="noreferrer">Discord <ExternalLink aria-hidden="true" /></a></div>
    </div>
    <div className="page-shell footer__bottom"><span>© {new Date().getFullYear()} Oakwood Online</span><span>All footage and features are work in progress.</span></div>
  </footer>
}

export function DevelopmentHub() {
  return <><PageNavigation notes />
    <main className="content-page">
      <section className="development-hero page-shell">
        <p className="eyebrow"><span />Development</p>
        <h1>Notes from the workbench.</h1>
        <p>Technical write-ups and development updates from the making of Oakwood Online—shared for the Unity and FishNet developers building worlds of their own.</p>
      </section>
      <section className="publication-section page-shell" aria-label="Engineering notes">
        <p className="eyebrow"><span />Engineering notes</p>
        <article className="publication-card">
          <div><p className="publication-card__meta">Engineering note · August 2, 2026 · 12 min read</p>
            <h2><a href={`${base}development/steam-auth-connection-grants/`}>Protecting Steam Authentication Tickets in an Unencrypted FishNet Transport</a></h2>
            <p>A practical pattern for exchanging a Steam ticket over HTTPS and using a 30-second, single-use connection grant to authenticate an unencrypted FishNet transport.</p>
          </div>
          <a className="button button--secondary" href={`${base}development/steam-auth-connection-grants/`}>Read engineering note <span aria-hidden="true">→</span></a>
        </article>
      </section>
    </main>
    <PageFooter />
  </>
}

const unityExchange = `string json = JsonUtility.ToJson(
    new SteamTicketExchangeRequest { steamTicket = ticketHex });
using var request = new UnityWebRequest(exchangeUrl, "POST") {
    uploadHandler = new UploadHandlerRaw(Encoding.UTF8.GetBytes(json)),
    downloadHandler = new DownloadHandlerBuffer()
};
request.SetRequestHeader("Content-Type", "application/json");
yield return request.SendWebRequest(); // exchangeUrl must be HTTPS
connectionGrant = JsonUtility.FromJson<ExchangeResponse>(
    request.downloadHandler.text).connectionGrant;`

const steamValidation = `const steamUrl = new URL(
  "https://partner.steam-api.com/ISteamUserAuth/AuthenticateUserTicket/v1/");
steamUrl.searchParams.set("key", requireEnvironment("STEAM_API_KEY"));
steamUrl.searchParams.set("appid", requireEnvironment("STEAM_APP_ID"));
steamUrl.searchParams.set("ticket", steamTicket);
steamUrl.searchParams.set("identity", requireEnvironment("STEAM_WEB_API_IDENTITY"));

const { response } = await (await fetch(steamUrl)).json();
if (response?.params?.result !== "OK") return unauthorized();
const steamId = response.params.steamid;`

const issueGrant = `const bytes = crypto.getRandomValues(new Uint8Array(32));
const grant = toBase64Url(bytes);
const grantHash = await sha256Hex(grant);
const expiresAt = new Date(Date.now() + 30_000).toISOString();

await issueGrant({ grant_hash: grantHash, steam_id: steamId, expires_at: expiresAt });
return Response.json({ connectionGrant: grant, expiresInSeconds: 30 });`

const redeemGrant = `// Client: the grant is consumed locally before it is broadcast.
if (TryConsumeConnectionGrant(out string grant))
    ClientManager.Broadcast(new ConnectionGrantBroadcast { ConnectionGrant = grant });

// Server: redeem over HTTPS with a host-only secret.
using var request = new HttpRequestMessage(HttpMethod.Post, redeemUrl);
request.Headers.Add("X-Game-Server-Key", serverApiKey);
request.Content = new StringContent(requestJson, Encoding.UTF8, "application/json");
var result = await http.SendAsync(request);
string steamId = await ReadSteamId(result);`

const atomicRedeem = `create function redeem_game_connect_grant(p_grant_hash text)
returns text language plpgsql security definer as $$
declare redeemed_steam_id text;
begin
  delete from private.game_connect_grants
  where grant_hash = p_grant_hash and expires_at > now()
  returning steam_id into redeemed_steam_id;
  return redeemed_steam_id;
end;
$$;`

function Code({ children }: { children: string }) { return <pre tabIndex={0}><code>{children}</code></pre> }

function Flow({ after }: { after: boolean }) {
  const steps = after
    ? [['Unity → HTTPS API', 'Exchanges the Steam ticket'], ['FishNet / Tugboat', 'Carries only a 30-second grant'], ['Server → HTTPS API', 'Redeems the grant using a server secret']]
    : [['Unity client', 'Requests Steam ticket'], ['FishNet / Tugboat', 'Carries the Steam ticket'], ['Game server', 'Asks Steam to validate it']]
  return <section className={`architecture-card ${after ? 'architecture-after' : 'architecture-before'}`}><div className="architecture-title"><span>{after ? 'After' : 'Before'}</span><strong>{after ? 'Ticket stays inside HTTPS' : 'Ticket crosses the game transport'}</strong></div><ol className="flow-list">{steps.map(([title, detail], index) => <li key={title}><span>{index + 1}</span><div><strong>{title}</strong><small>{detail}</small></div></li>)}</ol><p className="architecture-risk">{after ? 'A captured grant has a much smaller window and disappears on first successful redemption.' : 'The reusable proof of identity is visible wherever the unencrypted game packet is visible.'}</p></section>
}

export function EngineeringNote() {
  return <><PageNavigation notes />
    <main className="content-page article-page"><article>
      <header className="article-hero page-shell">
        <p className="breadcrumb"><a href={base}>Oakwood Online</a><span>/</span><a href={`${base}development/`}>Development</a><span>/</span>Engineering note</p>
        <p className="eyebrow"><span />Engineering note</p>
        <h1>Protecting Steam Authentication Tickets in an Unencrypted FishNet Transport</h1>
        <p className="article-dek">A practical pattern for moving the reusable credential onto HTTPS while leaving normal gameplay traffic on the transport it was designed for.</p>
        <div className="article-byline"><p>By <a href="https://github.com/JTSimmons" rel="author">JTSimmons — Developer of Oakwood Online</a></p><p><time dateTime="2026-08-02">August 2, 2026</time> · 12 min read</p></div>
      </header>
      <div className="article-body" id="article-content">
        <p className="article-lead">My first Steam authentication flow was straightforward: request a Steam Web API ticket in Unity, send that ticket in a FishNet authentication broadcast, validate it on the game server, and load the player by Steam ID. It worked. It also placed the most valuable credential in the flow on a transport I had deliberately not encrypted.</p>
        <p>The fix was not to encrypt every position update and gameplay message. I added a small HTTPS boundary that exchanges the Steam ticket for a narrow connection grant. The grant is all FishNet ever sees.</p>
        <aside className="callout"><strong>The core rule</strong><p>Send the Steam ticket only to an HTTPS endpoint. Send a random, short-lived, single-use grant over the game transport.</p></aside>
        <h2>The integration trap</h2>
        <p>FishNet’s authenticator is a natural place to prove identity before spawning a player. Its password-authenticator example warns developers not to send passwords without encryption. A Steam ticket is not a password, but the same transport question applies: anyone who captures the packet may be able to race or replay the credential while Steam still accepts it.</p>
        <p>Ticket uniqueness does not provide confidentiality. A fresh credential can still be stolen while it is valid.</p>
        <h2>Before and after</h2><div className="architecture-comparison"><Flow after={false} /><Flow after /></div>
        <h2>What is in the connection grant?</h2>
        <p>Nothing meaningful. The client receives 32 cryptographically random bytes encoded as Base64URL: a 43-character opaque string. It is not a JWT, contains no Steam ID, and grants no general access to Supabase or Steam.</p>
        <div className="grant-spec"><div><span>Entropy</span><strong>256 bits</strong></div><div><span>Lifetime</span><strong>30 seconds</strong></div><div><span>Uses</span><strong>One</strong></div><div><span>Payload</span><strong>None</strong></div></div>
        <p>The database stores only <code>SHA-256(grant)</code>, the verified Steam ID, and the expiration time. Hashing means a read-only database leak does not immediately reveal unused bearer grants.</p>
        <h2>The implementation</h2><p>These snippets are shortened and sanitized. They show the security boundaries, not all production error handling or application wiring.</p>
        <h3>1. Exchange the Steam ticket over HTTPS</h3><p>Unity obtains a Web API ticket, converts it to hex, and posts it directly to the public exchange endpoint. The game server never receives this ticket.</p><Code>{unityExchange}</Code>
        <h3>2. Let Steam establish the identity</h3><p>The Edge Function validates input shape and size first, then calls Steam’s publisher endpoint with server-side secrets. Only an <code>OK</code> result and a well-formed Steam ID can advance.</p><Code>{steamValidation}</Code>
        <h3>3. Generate an opaque grant and store only its hash</h3><p>After Steam succeeds, the function creates the bearer value, hashes it, and records the identity mapping with an exact expiration.</p><Code>{issueGrant}</Code>
        <h3>4. Send the grant through FishNet, then redeem server-to-server</h3><p>The unauthenticated FishNet broadcast contains only the opaque grant. The game server calls a separate HTTPS endpoint with a secret that never ships in the client build.</p><Code>{redeemGrant}</Code>
        <h3>5. Make redemption atomic in PostgreSQL</h3><p>A conditional delete with <code>RETURNING</code> prevents two servers from redeeming the same row: whichever transaction deletes it first wins.</p><Code>{atomicRedeem}</Code>
        <h2>The complete validation sequence</h2><ol className="sequence-list">
          <li><span>01</span><p><strong>Steam issues a Web API ticket to the Unity client.</strong> The client has not connected to the game server yet.</p></li>
          <li><span>02</span><p><strong>The client posts the ticket to the exchange Edge Function over HTTPS.</strong> TLS protects the credential in transit.</p></li>
          <li><span>03</span><p><strong>The function validates the ticket with Steam.</strong> Steam credentials stay in server-side environment variables.</p></li>
          <li><span>04</span><p><strong>The function issues a random grant.</strong> Its hash is stored beside the Steam ID and a timestamp 30 seconds in the future.</p></li>
          <li><span>05</span><p><strong>The client connects to FishNet and broadcasts the grant.</strong> It clears its local grant after use or failure.</p></li>
          <li><span>06</span><p><strong>The game server redeems the grant over HTTPS.</strong> The endpoint rejects callers without the game-server secret.</p></li>
          <li><span>07</span><p><strong>PostgreSQL deletes and returns the matching identity atomically.</strong> Missing, expired, malformed, or previously used grants all fail closed.</p></li>
          <li><span>08</span><p><strong>FishNet authenticates the connection.</strong> The verified Steam ID becomes server-side connection data used to load the player.</p></li>
        </ol>
        <h2>What security did this actually add?</h2><div className="threat-grid"><section><h3>Improved</h3><ul><li>The Steam ticket no longer crosses the unencrypted game transport.</li><li>A captured game packet exposes only an opaque bearer value.</li><li>The exposed value expires after 30 seconds and is deleted on use.</li><li>The database cannot redeem a stored hash as though it were the raw grant.</li><li>Only a server holding the redemption secret can turn the grant into a Steam ID.</li></ul></section><section><h3>Not solved</h3><ul><li>Normal gameplay packets remain unencrypted and unauthenticated by this design.</li><li>An active attacker can still race the legitimate client within the short grant window.</li><li>The flow does not prevent denial-of-service traffic.</li><li>A compromised client or game server can still expose credentials available to that process.</li><li>Secret rotation, rate limiting, telemetry, and monitoring remain separate work.</li></ul></section></div>
        <p>This is credential minimization, not transport encryption. It narrows the value and lifetime of what I accept over Tugboat. If the game later needs confidentiality or tamper protection for gameplay messages, that deserves its own transport-level design.</p>
        <h2>Practical notes for Unity and FishNet developers</h2><ul className="check-list"><li>Request a Steam ticket intended for your Web API identity and validate that same identity server-side.</li><li>Never embed the Steam publisher key, Supabase service-role key, or redemption secret in the Unity client.</li><li>Register the FishNet grant broadcast as unauthenticated, but enforce a strict pre-authentication state and disconnect on failure.</li><li>Use a cryptographic RNG; do not derive the grant from the Steam ID, connection ID, time, or ticket.</li><li>Store only a hash and redeem with one atomic database operation.</li><li>Return the same generic response for missing, expired, and used grants.</li><li>Keep the lifetime short enough to reduce exposure but long enough for real latency; 30 seconds is my current choice, not a universal constant.</li></ul>
        <h2>Why a separate service boundary?</h2><p>The Edge Functions are not a new identity provider. Steam remains the source of identity and the game database remains the source of character data. The service only translates one proof into another with narrower scope. The public exchange endpoint can see a Steam ticket, the private redemption endpoint can see a game-server secret, and neither secret belongs in gameplay messages.</p>
        <h2>Closing thought</h2><p>The original flow was attractive because it was direct. The revised flow adds two HTTPS calls and a tiny database table, but each part has one job: Steam proves the account, the grant bridges the connection, and FishNet authenticates the socket. That separation is worth the additional machinery.</p>
        <aside className="references"><h2>References</h2><ul><li><a href="https://partner.steamgames.com/doc/webapi/ISteamUserAuth">Steamworks: ISteamUserAuth / AuthenticateUserTicket</a></li><li><a href="https://partner.steamgames.com/doc/api/ISteamUser#GetAuthTicketForWebApi">Steamworks: GetAuthTicketForWebApi</a></li><li><a href="https://fish-networking.gitbook.io/docs/fishnet-building-blocks/components/utilities/authenticator">FishNet documentation: Authenticator</a></li><li><a href="https://supabase.com/docs/guides/functions">Supabase documentation: Edge Functions</a></li></ul></aside>
      </div>
    </article></main><PageFooter />
  </>
}
