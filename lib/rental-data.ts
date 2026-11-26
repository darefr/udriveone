export const business = {
  name: 'U Drive Car Rental Kathmandu',
  shortName: 'U Drive',
  whatsappNumber: '' as string,
  base: 'Kathmandu, Nepal',
  coverage: 'Kathmandu and across Nepal',
  description:
    'Self-drive and chauffeur-driven car rentals from Kathmandu, for journeys across Nepal.',
} as const

const whatsappRecipient = business.whatsappNumber.replace(/\D/g, '')
export const whatsAppContact = {
  href: `https://wa.me/${whatsappRecipient}?text=${encodeURIComponent('Hello U Drive, I would like to enquire about renting a car from Kathmandu.')}`,
  direct: Boolean(whatsappRecipient),
  label: whatsappRecipient
    ? 'Chat with U Drive on WhatsApp'
    : 'Share a rental enquiry on WhatsApp — choose your U Drive contact',
}

export type Vehicle = {
  slug: string
  name: string
  dailyRate: number
  image: string
  gallery: { image: string; label: string }[]
  overview: string
  specifications: { label: string; value: string }[]
}

const vehicle = (
  slug: string,
  name: string,
  dailyRate: number,
  overview: string,
): Vehicle => ({
  slug,
  name,
  dailyRate,
  overview,
  image: `/images/${slug}.webp`,
  gallery: [
    { image: `/images/${slug}.webp`, label: 'Front three-quarter view' },
    { image: `/images/${slug}-rear.webp`, label: 'Rear three-quarter view' },
  ],
  specifications: [],
})

export const fleet: Vehicle[] = [
  vehicle(
    'deepal-s05',
    'Deepal S05',
    10000,
    'Make the Deepal S05 the starting point for your Nepal itinerary. Choose the freedom of self drive or leave the driving to a chauffeur, with pickup or delivery arranged around your plans.',
  ),
  vehicle(
    'byd-atto-3',
    'BYD Atto 3',
    9000,
    'From a Kathmandu city break to a longer journey, build your itinerary around the BYD Atto 3. Select your dates, choose your rental mode, and discuss your route with U Drive.',
  ),
  vehicle(
    'tata-nexon',
    'Tata Nexon',
    7500,
    'Set your own pace in the Tata Nexon. Plan a few days in the valley or a route further afield, with self-drive and with-driver options from Kathmandu.',
  ),
  vehicle(
    'byd-atto-1',
    'BYD Atto 1',
    6500,
    'Discover the BYD Atto 1, the lowest daily rate in our current collection. Start in Kathmandu and choose a self-drive trip or a driver for your planned journey.',
  ),
]

export const rentalModes = [
  { value: 'self-drive', label: 'Self Drive' },
  { value: 'with-driver', label: 'With Driver' },
] as const
export type RentalMode = (typeof rentalModes)[number]['value']
export const money = (value: number) =>
  `NPR ${new Intl.NumberFormat('en-US').format(value)}`
export const getVehicle = (slug?: string) => fleet.find((v) => v.slug === slug)
export const modeLabel = (mode: string) =>
  rentalModes.find((m) => m.value === mode)?.label ?? 'Self Drive'
export const pickupLocations = [
  'Kathmandu',
  'Pokhara',
  'Chitwan',
  'Nagarkot',
  'Other location in Nepal',
]

export type Destination = {
  slug: string
  name: string
  category: string
  tagline: string
  description: string
  stops: string[]
  advice: string
  image: string
}
export const destinations: Destination[] = [
  {
    slug: 'pokhara',
    name: 'Pokhara',
    category: 'Lakes & hills',
    tagline: 'Lakeside roads & mountain views',
    description:
      'Take a slower turn by Phewa Lake. Pokhara pairs a lakeside town with green hills and wide views towards the Annapurna range.',
    stops: ['Phewa Lakeside', 'Old Bazaar', 'Sarangkot viewpoint'],
    advice:
      'Allow flexibility for weather and road conditions on the journey from Kathmandu. Confirm your route and stops before departure.',
    image: '/images/drive-pokhara.webp',
  },
  {
    slug: 'kathmandu',
    name: 'Kathmandu',
    category: 'City & culture',
    tagline: 'Courtyards, culture & city drives',
    description:
      'Start with a city drive through the valley. Choose a compact car for your Kathmandu itinerary, or let a driver handle the streets while you plan the stops.',
    stops: ['Kathmandu Durbar Square', 'Boudhanath', 'Swayambhunath'],
    advice:
      'Many heritage squares are best explored on foot. Plan a nearby drop-off or parking point with the team.',
    image: '/images/drive-kathmandu.webp',
  },
  {
    slug: 'nagarkot',
    name: 'Nagarkot',
    category: 'Lakes & hills',
    tagline: 'Ridge roads & Himalayan horizons',
    description:
      'Trade the city streets for pine-lined bends and open ridgelines. On a clear morning, Nagarkot looks out over layers of foothills towards the Himalayas.',
    stops: ['Nagarkot ridge', 'View tower area', 'Village walking trails'],
    advice:
      'Mountain views depend on the weather. Discuss the hill road and the best handover time for your itinerary.',
    image: '/images/drive-nagarkot.webp',
  },
  {
    slug: 'chitwan',
    name: 'Chitwan',
    category: 'Nature',
    tagline: 'Riverbanks & the quiet lowlands',
    description:
      'Follow the road into the green Terai lowlands. Chitwan is a change of pace, with riverside stays, open landscapes, and forest at the edge of town.',
    stops: ['Sauraha', 'Rapti riverbank', 'Tharu village walks'],
    advice:
      'Your rental covers the road journey. Park entry, guides, and wildlife activities are separate arrangements.',
    image: '/images/drive-chitwan.webp',
  },
]

export const journeySteps = [
  {
    title: 'Choose your car',
    text: 'Compare the four vehicles and their published daily rates.',
  },
  {
    title: 'Pick a rental type',
    text: 'Take the wheel yourself or request a car with a driver.',
  },
  {
    title: 'Set your dates',
    text: 'Choose your pickup and return dates to see a base estimate.',
  },
  {
    title: 'Request your rental',
    text: 'Add your contact information, pickup point, and trip notes.',
  },
  {
    title: 'Confirm details',
    text: 'Agree availability, any additional charges, and rental terms with U Drive.',
  },
  {
    title: 'Pickup or delivery',
    text: 'Meet at the agreed location, check the vehicle, and begin your trip.',
  },
]
export type FAQItem = { question: string; answer: string; category: string }
export const faqs: FAQItem[] = [
  {
    category: 'Rentals',
    question: 'Can I rent a car without a driver?',
    answer:
      'Yes. U Drive offers Self Drive and With Driver rentals. Select your preferred option when planning your booking.',
  },
  {
    category: 'Coverage',
    question: 'Where does U Drive offer service?',
    answer:
      'U Drive is based in Kathmandu and offers vehicle service and delivery across Nepal. The exact meeting point, route, and any delivery cost are agreed before a rental is confirmed.',
  },
  {
    category: 'Pricing',
    question: 'How is my rental estimate calculated?',
    answer:
      'The estimate is the selected vehicle’s published daily rate multiplied by the number of days between pickup and return. Driver service, delivery, and other applicable charges are confirmed separately.',
  },
  {
    category: 'Booking',
    question: 'Does a booking request reserve a vehicle?',
    answer:
      'A request is not a reservation. Availability, final pricing, and handover details must be confirmed by U Drive. In this demonstration, you can prepare and download a request; it is not sent.',
  },
  {
    category: 'Rentals',
    question: 'Which documents will I need?',
    answer:
      'For self drive, ask U Drive to confirm licence eligibility, identification, deposit, and other rental requirements for your trip before making travel plans.',
  },
  {
    category: 'Coverage',
    question: 'Can the vehicle be delivered to my location?',
    answer:
      'You can request delivery in Kathmandu or elsewhere in Nepal. Include the address in your request so that access, timing, and any delivery charge can be confirmed.',
  },
  {
    category: 'Pricing',
    question: 'Is a chauffeur included in the daily rate?',
    answer:
      'The listed prices are the supplied vehicle rental rates. Choose With Driver to request a chauffeur and have the complete price confirmed before booking.',
  },
  {
    category: 'Booking',
    question: 'Can I plan a trip without an account?',
    answer:
      'Yes. Browse all four cars and prepare a booking estimate without signing in. Account services are not connected in this visual demo.',
  },
]

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/rental-options', label: 'Rental Options' },
  { href: '/destinations', label: 'Drive Nepal' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/about', label: 'About' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
]

export type Review = {
  name: string
  avatar?: string
  rating: number
  text: string
  rentalType: RentalMode
  vehicle: string
}
export const demoReviews: Review[] = [
  {
    name: 'Sample traveller A',
    rating: 5,
    text: 'Being able to choose the car, compare the daily rate, and plan our own stops is exactly how we like to travel.',
    rentalType: 'self-drive',
    vehicle: 'Deepal S05',
  },
  {
    name: 'Sample traveller B',
    rating: 5,
    text: 'For a trip with family, having a driver would let us enjoy the scenery together instead of watching the road.',
    rentalType: 'with-driver',
    vehicle: 'BYD Atto 3',
  },
  {
    name: 'Sample traveller C',
    rating: 4,
    text: 'Starting with a clear daily price makes it much easier to decide which car fits a few days away from the city.',
    rentalType: 'self-drive',
    vehicle: 'Tata Nexon',
  },
]
