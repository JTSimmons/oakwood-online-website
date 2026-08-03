import { Anvil, Compass, CookingPot, Hammer, TreePine, Users } from 'lucide-react'

export const siteContent = {
  navigation: [
    { label: 'The World', href: '#world' },
    { label: 'Features', href: '#features' },
    { label: 'Development', href: '#development' },
    { label: 'Engineering Notes', href: '/development/' },
    { label: 'FAQ', href: '#faq' },
  ],
  hero: {
    eyebrow: 'A persistent world shaped by its players',
    title: 'Build something that lasts.',
    description:
      'Gather from the wild, master honest crafts, and raise a village with friends in a grounded medieval world where every wall has a story.',
    primaryCta: { label: 'Follow the journey', href: '#community' },
    secondaryCta: { label: 'Explore the world', href: '#world' },
  },
  overview: {
    eyebrow: 'Welcome to Oakwood',
    title: 'A quieter kind of MMO adventure',
    body: [
      'Oakwood Online is built around the satisfaction of making a place in the world—not rushing through it. The forest is your workshop, the road ahead is uncertain, and a good neighbor is worth more than a chest of silver.',
      'Whether you are laying the first beam of a cottage, preparing supper after a long expedition, or helping turn a few scattered homes into a thriving village, your work leaves a mark.',
    ],
    values: [
      { value: 'Persistent', label: 'Shared world' },
      { value: 'Cooperative', label: 'By design' },
      { value: 'Player-made', label: 'Homes & villages' },
    ],
  },
  features: [
    { icon: TreePine, number: 'I', title: 'Live from the land', description: 'Harvest timber, stone, ore, and food from a world that rewards preparation and an observant eye.' },
    { icon: Hammer, number: 'II', title: 'Build a real home', description: 'Plan and construct useful spaces piece by piece, from a forest shelter to a permanent homestead.' },
    { icon: Users, number: 'III', title: 'Raise a village', description: 'Pool skills and materials with other players to build something no lone traveler could manage.' },
    { icon: CookingPot, number: 'IV', title: 'Cook with purpose', description: 'Tend the fire, combine ingredients, and prepare meals that make the next day’s work possible.' },
    { icon: Compass, number: 'V', title: 'Go beyond the path', description: 'Cross old forests and forgotten ground in search of resources, discoveries, and a story worth retelling.' },
    { icon: Anvil, number: 'VI', title: 'Master your craft', description: 'Turn raw materials into tools, equipment, and building parts through practical, hands-on professions.' },
  ],
  screenshots: [
    { title: 'A home among the oaks', label: 'Building & homesteads', variant: 'homestead' },
    { title: 'Work worth sharing', label: 'Gathering & crafting', variant: 'crafting' },
    { title: 'Warm food, long roads', label: 'Cooking & survival', variant: 'campfire' },
    { title: 'Beyond the village', label: 'Exploration', variant: 'exploration' },
  ],
  development: {
    eyebrow: 'In active development',
    title: 'Built in the open, one system at a time',
    description: 'Oakwood Online is an independent project in early development. Core systems are taking shape now, and community playtests will help decide what deserves attention next.',
    milestones: [
      { label: 'Core foundation', detail: 'Multiplayer, interaction, inventory', status: 'Built' },
      { label: 'Living systems', detail: 'Gathering, crafting, building, combat', status: 'In progress' },
      { label: 'The wider world', detail: 'Villages, exploration, deeper progression', status: 'Ahead' },
    ],
  },
  faq: [
    { question: 'What kind of game is Oakwood Online?', answer: 'It is a semi-realistic medieval survival and crafting MMO. The focus is on gathering, making useful things, building lasting homes and villages, exploring, and cooperating with other players.' },
    { question: 'When can I play?', answer: 'Oakwood Online is still in early development. A Steam Playtest is planned, with timing announced through Discord as the build becomes ready for more players.' },
    { question: 'Will I need to play with a group?', answer: 'No. You can gather, craft, explore, and build on your own, but the world is designed so cooperation makes larger goals—especially villages—more achievable and meaningful.' },
    { question: 'Is this a fast-paced survival game?', answer: 'The pace is deliberate. Preparation, useful crafts, and persistent progress matter more than constant action. There will still be danger and discovery, but the game is meant to make the quiet work feel worthwhile.' },
    { question: 'What platforms are planned?', answer: 'The initial focus is PC through Steam. Additional platforms are not currently announced.' },
    { question: 'How can I support development?', answer: 'Join the Discord, share thoughtful feedback, and follow the Steam Playtest. An active, constructive early community is the most valuable support right now.' },
  ],
  links: {
    steam: '#',
    discord: 'https://discord.gg/5wcUbVU58',
  },
}

export type Screenshot = (typeof siteContent.screenshots)[number]
