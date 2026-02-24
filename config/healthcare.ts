// ─── Healthcare Portal Configuration ─────────────────────────────────────────
// All UI-driving constants. No hardcoding in components.

export const DOCTORS = [
    {
        id: 'dr-kim',
        name: 'Dr. Ji-Young Kim, MD',
        specialty: 'Psychiatry & Telehealth',
        vertical: 'psychiatric_telehealth',
        avatar: '/images/avatar-01.jpg',
        bio: 'Board-certified psychiatrist specializing in anxiety, depression, and trauma. 12 years of experience in evidence-based telehealth.',
        rating: 4.9,
        reviews: 312,
        nextAvailable: 'Today, 3:00 PM',
        color: 'from-violet-500 to-purple-600',
        badge: 'bg-violet-500/20 text-violet-300',
        border: 'border-violet-500/40',
        tags: ['Anxiety', 'Depression', 'PTSD', 'ADHD'],
    },
    {
        id: 'dr-patel',
        name: 'Dr. Rohan Patel, DDS',
        specialty: 'General & Emergency Dentistry',
        vertical: 'dental',
        avatar: '/images/avatar-02.jpg',
        bio: 'Expert in emergency pain relief, cosmetic restoration, and preventive care. Same-day emergency appointments available.',
        rating: 4.8,
        reviews: 208,
        nextAvailable: 'Tomorrow, 9:00 AM',
        color: 'from-cyan-500 to-blue-600',
        badge: 'bg-cyan-500/20 text-cyan-300',
        border: 'border-cyan-500/40',
        tags: ['Emergency', 'Cosmetic', 'Root Canal', 'Implants'],
    },
    {
        id: 'dr-chen',
        name: 'Dr. Mei-Ling Chen, MD',
        specialty: 'Internal Medicine & Primary Care',
        vertical: 'general',
        avatar: '/images/avatar-03.jpg',
        bio: 'Comprehensive primary care for adults with a focus on preventive medicine, chronic disease, and wellness planning.',
        rating: 4.7,
        reviews: 445,
        nextAvailable: 'Today, 5:30 PM',
        color: 'from-emerald-500 to-teal-600',
        badge: 'bg-emerald-500/20 text-emerald-300',
        border: 'border-emerald-500/40',
        tags: ['Primary Care', 'Diabetes', 'Hypertension', 'Preventive'],
    },
    {
        id: 'dr-okafor',
        name: 'Dr. Chidi Okafor, PhD',
        specialty: 'Clinical Psychology',
        vertical: 'psychiatric_telehealth',
        avatar: '/images/avatar-04.jpg',
        bio: 'Cognitive Behavioral Therapy (CBT) specialist with expertise in OCD, phobias, and relationship issues. Telehealth and in-person.',
        rating: 4.9,
        reviews: 189,
        nextAvailable: 'Today, 1:00 PM',
        color: 'from-rose-500 to-pink-600',
        badge: 'bg-rose-500/20 text-rose-300',
        border: 'border-rose-500/40',
        tags: ['CBT', 'OCD', 'Couples', 'Grief'],
    },
]

export const TIME_SLOTS = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '1:00 PM', '1:30 PM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM',
    '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
]

// Demo appointments for the admin table (seeded with realistic data)
export const DEMO_APPOINTMENTS = [
    {
        id: 'APPT-75206',
        patientName: 'Sarah Johnson',
        patientPhone: '+1 (555) 231-4567',
        doctor: 'Dr. Ji-Young Kim, MD',
        specialty: 'Psychiatry & Telehealth',
        date: 'Feb 24, 2026',
        time: '3:00 PM',
        reason: 'Severe anxiety and panic attacks',
        status: 'confirmed',
        type: 'telehealth',
        vertical: 'psychiatric_telehealth',
    },
    {
        id: 'APPT-82311',
        patientName: 'Marcus Rivera',
        patientPhone: '+1 (555) 891-2034',
        doctor: 'Dr. Rohan Patel, DDS',
        specialty: 'General Dentistry',
        date: 'Feb 25, 2026',
        time: '9:00 AM',
        reason: 'Severe toothache, possible infection',
        status: 'pending',
        type: 'in-person',
        vertical: 'dental',
    },
    {
        id: 'APPT-61022',
        patientName: 'Aisha Thompson',
        patientPhone: '+1 (555) 670-4412',
        doctor: 'Dr. Mei-Ling Chen, MD',
        specialty: 'Internal Medicine',
        date: 'Feb 23, 2026',
        time: '5:30 PM',
        reason: 'Annual check-up and blood pressure review',
        status: 'completed',
        type: 'in-person',
        vertical: 'general',
    },
    {
        id: 'APPT-44791',
        patientName: 'David Kim',
        patientPhone: '+1 (555) 123-9876',
        doctor: 'Dr. Chidi Okafor, PhD',
        specialty: 'Clinical Psychology',
        date: 'Feb 26, 2026',
        time: '1:00 PM',
        reason: 'OCD management and CBT session',
        status: 'pending',
        type: 'telehealth',
        vertical: 'psychiatric_telehealth',
    },
    {
        id: 'APPT-39104',
        patientName: 'Elena Vasquez',
        patientPhone: '+1 (555) 442-8801',
        doctor: 'Dr. Ji-Young Kim, MD',
        specialty: 'Psychiatry & Telehealth',
        date: 'Feb 22, 2026',
        time: '2:30 PM',
        reason: 'Medication follow-up — SSRI adjustment',
        status: 'cancelled',
        type: 'telehealth',
        vertical: 'psychiatric_telehealth',
    },
]

export const VERTICAL_CONFIG: Record<string, any> = {
    psychiatric_telehealth: {
        label: '🧠 Psychiatric Telehealth',
        gradient: 'from-violet-500 to-purple-600',
        border: 'border-violet-500/40',
        cardBg: 'bg-violet-950/20',
        badge: 'bg-violet-500/20 text-violet-300 border-violet-500/40',
        scenarios: [
            "I've been struggling with severe anxiety and panic attacks for 3 months. I can't sleep and it's affecting my work.",
            "I think I need help with depression. I've lost interest in everything and feel hopeless most days.",
            "I'm experiencing PTSD symptoms from a traumatic event. I need to see a therapist urgently.",
            "I've been having intrusive thoughts that I can't control. I think I might have OCD.",
        ],
    },
    dental: {
        label: '🦷 Dental Office',
        gradient: 'from-cyan-500 to-blue-600',
        border: 'border-cyan-500/40',
        cardBg: 'bg-cyan-950/20',
        badge: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
        scenarios: [
            "I have a severe toothache in my upper right molar. The pain is unbearable and I think there's an infection.",
            "One of my front teeth broke in half. I need emergency dental care as soon as possible.",
            "I've had a throbbing pain in my jaw for 5 days. My face is slightly swollen.",
            "I need a root canal consultation. My dentist referred me but I need to schedule with a specialist.",
        ],
    },
    general: {
        label: '🏥 General Medicine',
        gradient: 'from-emerald-500 to-teal-600',
        border: 'border-emerald-500/40',
        cardBg: 'bg-emerald-950/20',
        badge: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
        scenarios: [
            "I need a prescription refill for my blood pressure medication. My last prescription ran out.",
            "I've had a persistent cough for 3 weeks and a mild fever. I need to be seen.",
            "I need my annual physical exam and routine blood work.",
            "I've been having chest pain when I exercise. I need a cardiac evaluation.",
        ],
    },
}

export const TOOL_ICONS: Record<string, string> = {
    triage_patient: '🩺',
    check_provider_availability: '📅',
    book_appointment: '✅',
    create_telehealth_room: '📹',
    send_confirmation_sms: '📱',
    get_providers: '👩‍⚕️',
    emergency_redirect: '🚨',
    default: '⚙️',
}

export const URGENCY_STYLES: Record<string, string> = {
    EMERGENT: 'bg-red-500/20 text-red-300 border border-red-500/40',
    URGENT: 'bg-orange-500/20 text-orange-300 border border-orange-500/40',
    ROUTINE: 'bg-green-500/20 text-green-300 border border-green-500/40',
}

export const GENDER_OPTIONS = ['Male', 'Female', 'Non-binary', 'Prefer not to say']
export const BLOOD_TYPES = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown']
export const ID_TYPES = ['Driver\'s License', 'State ID', 'Passport', 'Military ID', 'Social Security Card', 'Insurance Card']
export const PRIMARY_CONCERNS = [
    'Mental Health / Psychiatry',
    'Dental / Oral Health',
    'Primary Care / General Medicine',
    'Cardiology',
    'Orthopedics',
    'Neurology',
    'Dermatology',
    'Other',
]
