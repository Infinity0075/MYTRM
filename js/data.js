/**
 * MYTRM - Data Store
 * Contains verified clinical practitioners, categories, testimonials, FAQs, and preset slots.
 */

const doctors = [
  {
    id: "d01", name: "Neetee Bhardwaj", photoUrl: "assets/doctors/IMG_6971 - Neetee Bhardwaj.jpeg",
    title: "Psychologist & Counsellor", qualifications: "Master's in Clinical Psychology",
    experienceYears: 1, featured: true, specializationsTop: ["Anxiety & Panic","Stress Management","LGBTQIA+ Affirmative"],
    specializationsFull: ["Anxiety disorders","Sleep disorders","Stress management","Anger Management","Overthinking","Grief & Loss","OCD","Trauma","PTSD","Eating Disorders","Mood disorders","Adult ADHD","Work-Life balance","Parenting concerns","Academic concerns","Career confusion"],
    languages: ["Hindi","English","Haryanvi"], city: "Gurugram", state: "Haryana",
    availabilitySummary: "Wed / Sat / Sun, flexible slots 9-11am & 4-6pm",
    bio: "I am Neetee Bhardwaj, a Psychologist and Counsellor committed to creating a safe and non-judgmental space where individuals can share, heal, and grow. With clinical experience in hospitals and polyclinics, I focus on helping people overcome stress, anxiety, mood-related concerns, and personal challenges.",
    bioQuote: "Hospital-trained clinical psychologist focusing on anxiety, stress management, and empowering personal healing.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d02", name: "Muskaan Kalra", photoUrl: "assets/doctors/IMG-20250819-WA0009 - Muskaan Kalra.jpg",
    title: "Counselling Psychologist", qualifications: "Master's in Clinical Psychology",
    experienceYears: 1, featured: true, specializationsTop: ["CBT & DBT","Expressive Art Therapy","Relationship Skills"],
    specializationsFull: ["CBT","DBT","Psychodynamic Therapy","Expressive Art Therapy","Internet/Social media dependence","Self improvement","Grief & Loss","Relationship skills","Academic concerns","Career confusion"],
    languages: ["Hindi","English","Punjabi","Haryanvi"], city: "Faridabad", state: "Haryana",
    availabilitySummary: "Mon / Wed / Fri / Sun, 12pm-5pm",
    bio: "I am Muskaan Kalra, a Counselling Psychologist with specialization in CBT, DBT, Psychodynamic Therapy, and Expressive Art Therapy. I am passionate about creating a safe, empathetic space where individuals can heal, build resilience, and achieve meaningful personal growth.",
    bioQuote: "Specialist in CBT, DBT, and Expressive Art Therapy creating a compassionate space for emotional resilience.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d03", name: "Dr. Pratosh Kamal Das", photoUrl: "assets/doctors/photo-1 - Pratosh Kamal Das.jpg",
    title: "Clinical Psychologist", qualifications: "M.Phil Clinical Psychology (RCI), Honorary Doctorate in Counseling",
    experienceYears: 4, specializationsTop: ["Relationship Therapy","Sexual Wellness","Trauma & RCI Practice"],
    specializationsFull: ["Anxiety","Depression","Sleep disorders","Anger Management","Sexual Dysfunctions","OCD","Trauma","PTSD","Personality Disorders","Bipolar disorder","Work-Life balance","Relationship skills"],
    languages: ["Hindi","English","Assamese","Bengali","Haryanvi"], city: "Guwahati", state: "Assam",
    availabilitySummary: "Mon-Fri, 6:30pm-10:30pm",
    bio: "RCI Licensed Clinical Psychologist, Licensed Hypnotherapist, Licensed NLP Practitioner and Sex Therapist. 4 years of individual clinical experience, 8 years total work experience, 100+ individual sessions conducted.",
    bioQuote: "RCI Licensed Clinical Psychologist with 4+ years of clinical practice in relationships, trauma, and sex therapy.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d04", name: "Sushma Prajapati", photoUrl: "assets/doctors/02BAF9EC-EC37-4D70-8BD4-0F73C90E8669 - SUSHMA.jpg",
    title: "Therapist", qualifications: "Master's in Clinical Psychology",
    experienceYears: 1, specializationsTop: ["Relationship","Child & Youth","Trauma-Informed Therapy"],
    specializationsFull: ["Grief in therapy","Suicide prevention training","Trauma-informed therapy","Child psychology","Brief Psychodynamic","Stress management","Anger Management","Loneliness","Overthinking","Relationship skills"],
    languages: ["Hindi","English"], city: "Dehradun", state: "Uttarakhand",
    availabilitySummary: "Mon-Sat, fixed 3pm & 5pm slots",
    bio: "I am Sushma Prajapati, guided by trauma-informed therapy. I offer a safe and compassionate space where stories are heard with care, walking beside clients on their journey of healing, growth, and self-discovery.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d05", name: "Anjlee Yadav", photoUrl: "assets/doctors/IMG_20250819_211747 - Anjlee yadav.jpg",
    title: "Counsellor & Therapist", qualifications: "M.A. Counseling Psychology",
    experienceYears: 1, specializationsTop: ["Relationship","Career","Academic"],
    specializationsFull: ["CBT","ACT","EFT","Couple Counselling","Expressive Arts Therapy (ongoing)","Work-Life balance","Career confusion","Academic concerns","Time management"],
    languages: ["Hindi","English","Haryanvi"], city: "Hansi", state: "Haryana",
    availabilitySummary: "All week, fixed 12pm-5pm (WFH)",
    bio: "I am Anjlee Yadav, a counselor and therapist with expertise in Counseling Psychology, Psycho-oncology, and Marriage & Family Counseling, plus ongoing training in Expressive Arts Therapy and certifications in CBT, ACT, EFT, and Couple Counseling.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d06", name: "Prachi Sachdev", photoUrl: "assets/doctors/D5C163A5-95F6-4B3A-830C-913387E8C8EA - prachi sachdev.jpeg",
    title: "Psychologist", qualifications: "MA Clinical Psychology, BA (Psychology & English)",
    experienceYears: 1, specializationsTop: ["Relationship","Career","Academic","Psychological Disorders","LGBTQIA+"],
    specializationsFull: ["Anxiety","Depression","Stress management","Anger Management","Overthinking","LGBTQIA+ concerns","Adjustment disorders","Mood disorders","Adult ADHD","Work-Life balance","Career confusion"],
    languages: ["Hindi","English","Punjabi"], city: "Delhi", state: "Delhi",
    availabilitySummary: "Mon-Sat, 4pm-8pm weekdays / 1pm-6pm weekend",
    bio: "I am Prachi, a dedicated counsellor with a passion for helping individuals navigate challenges and discover their strengths. I believe in creating a safe, non-judgmental space for growth and healing, where clients feel heard, supported, and empowered.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d07", name: "Ritu Yadav", photoUrl: "assets/doctors/intern photo - Ritu Yadav.jpg",
    title: "Counsellor Psychologist", qualifications: "Master's in Psychology",
    experienceYears: 1, specializationsTop: ["Relationship","Career","Sexual Wellness","Academic","Psychological Disorders"],
    specializationsFull: ["Anxiety","Depression","Stress management","Anger Management","OCD","Trauma","PTSD","Eating Disorders","Bipolar disorder","Relationship skills","Academic concerns"],
    languages: ["Hindi","English","Haryanvi"], city: "Gurgaon", state: "Haryana",
    availabilitySummary: "Mon-Sat, 11am-7pm (WFH)",
    bio: "I am Ritu Yadav, counsellor psychologist offering treatment for anxiety, depression, anger management and stress-related concerns. My holistic approach combines therapy and lifestyle adjustment to promote overall well-being.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d08", name: "Shruti Vohra", photoUrl: "assets/doctors/my passport size pic (me)_1 - Shruti Vohra.jpg",
    title: "Counselling Psychologist", qualifications: "BA (Hons) Applied Psychology, MA Psychology",
    experienceYears: 0, specializationsTop: ["Career","Academic","Psychological Disorders","LGBTQIA+","Child & Youth"],
    specializationsFull: ["Anxiety","Depression","Stress management","Self improvement","OCD","LGBTQIA+ concerns","Child Specialist","Personality Disorders","Mood disorders","Adult ADHD","Academic concerns"],
    languages: ["Hindi","English"], city: "New Delhi", state: "Delhi",
    availabilitySummary: "Mon-Sat, 10am-6pm (WFH)",
    bio: "I'm Shruti, a counselor and psychology professional passionate about creating a safe and supportive space where individuals feel heard and understood, with training in clinical psychology across hospitals, schools, and research settings.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d09", name: "Dr Usha Jangra", photoUrl: "assets/doctors/IMG_20220320_113507 - Usha Nishal.jpg",
    title: "Clinical Psychologist", qualifications: "MA Clinical Psychology, Bachelor of Dental Surgery",
    experienceYears: 0, specializationsTop: ["Relationship","Psychological Disorders"],
    specializationsFull: ["Anxiety","Loneliness","Negative thinking","Overthinking","Trauma","PTSD","Divorce/Separation","Parenting concerns","Academic concerns"],
    languages: ["Hindi","English"], city: "Gurgaon", state: "Haryana",
    availabilitySummary: "Mon-Fri, 9pm-12am (WFH)",
    bio: "I am Dr Usha, clinical psychologist, counsellor, and dental surgeon, driven by a commitment to understanding human behaviour and mental well-being through analytical and compassionate approaches.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d10", name: "Hiba", photoUrl: "assets/doctors/IMG_20260701_182932712_HDR - Hiba.jpg",
    title: "Psychologist & Counsellor", qualifications: "BA (Hons) Applied Psychology, MA Psychology (Clinical specialization)",
    experienceYears: 2, featured: true, specializationsTop: ["Clinical Psychology", "Relationship Skills", "Trauma & Resilience"],
    specializationsFull: ["Anxiety","Depression","Stress management","Grief & Loss","OCD","Schizophrenia","Trauma","PTSD","Eating Disorders","Bipolar disorder","Adult ADHD","Relationship skills","Parenting concerns"],
    languages: ["Hindi","English","Urdu"], city: "New Delhi", state: "Delhi",
    availabilitySummary: "Mon-Sat 5pm-12am, Sun 9am-5pm (WFH)",
    bio: "I am Hiba, a psychologist and counsellor who believes healing begins when people feel truly heard. I offer a warm, compassionate, non-judgmental space, working toward understanding emotions and building resilience and lasting change.",
    bioQuote: "Psychologist offering a warm, non-judgmental space focused on building resilience, self-understanding, and lasting change.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d11", name: "Janvi Sontakke", photoUrl: "assets/doctors/1755674979409 - Janvi Sontakke.jpg",
    title: "Clinical Psychologist", qualifications: "Bachelor's in Psychology/MLT/Sociology, Master's in Clinical Psychology",
    experienceYears: 0, specializationsTop: ["Relationship","Academic","Child & Youth"],
    specializationsFull: ["Anxiety","Stress management","Addiction","Self improvement","Anger Management","OCD","Trauma","PTSD","Work-Life balance"],
    languages: ["Hindi","English","Marathi"], city: "Nagpur", state: "Maharashtra",
    availabilitySummary: "Mon/Wed/Fri/Sat, 6am-12pm & 6pm-12am",
    bio: "I am Janvi Sontakke, a Clinical Psychologist skilled in psychological assessments, counseling, and evidence-based interventions, integrating CBT, Emotion-Focused Therapy, and positive psychology to promote resilience and growth.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d12", name: "Seema Rahman", photoUrl: "assets/doctors/picture Seema  - Seema Rahman.jpg",
    title: "Psychologist", qualifications: "Master's in Clinical & Counselling Psychology, PG Diploma in Guidance & Counselling",
    experienceYears: 25, specializationsTop: ["Relationship","Career","Psychological Disorders","Child & Youth"],
    specializationsFull: ["Anxiety","Depression","Stress management","Anger Management","Overthinking","Grief & Loss","Personality Disorders","Mood disorders","Work-Life balance","Relationship skills","Career confusion"],
    languages: ["Hindi","English","Urdu"], city: "Lucknow", state: "Uttar Pradesh",
    availabilitySummary: "All week, flexible schedule",
    bio: "With 25 years of experience as a psychologist, I have had the privilege of walking alongside people through their journeys of healing, growth, and self-discovery, creating a safe, compassionate, non-judgmental space to find clarity and balance.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d13", name: "Saumya Mishra", photoUrl: "assets/doctors/20240719_200010 - Saumya Mishra.jpg",
    title: "Counselling Psychologist", qualifications: "MA Counselling Psychology, B.El.Ed",
    experienceYears: 1, specializationsTop: ["Relationship","Career","Academic"],
    specializationsFull: ["Stress management","Self improvement","Anger Management","Loneliness","Self esteem & Confidence","Work-Life balance","Relationship skills","Career confusion"],
    languages: ["Hindi","English"], city: "Delhi", state: "Delhi",
    availabilitySummary: "Mon-Sat, 12pm-7pm / weekend 10am-2pm",
    bio: "I'm Saumya Mishra, a counselling psychologist who believes everyone deserves a safe and gentle space to just be. I bring curiosity, warmth, and compassion to help clients ease burdens and reconnect with what truly feels like them.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d14", name: "Sagar Kumar", photoUrl: "assets/doctors/IMG-20250820-WA0018 - Sagar Kumar.jpg",
    title: "Counselling Psychologist", qualifications: "MA Psychology, BA Psychology",
    experienceYears: 0, specializationsTop: ["Relationship","Career","Academic","Psychological Disorders"],
    specializationsFull: ["Anxiety","Depression","Stress management","Addiction","Anger Management","Overthinking","Personality disorders","Mood disorders","Work-Life balance","Academic concerns"],
    languages: ["Hindi","English"], city: "Ghaziabad", state: "Uttar Pradesh",
    availabilitySummary: "All week, 12pm-6pm",
    bio: "I'm here to offer a safe and caring space where you can share your thoughts and feelings freely. I support clients with stress, anxiety, or relationship challenges while guiding them toward personal growth and confidence.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d15", name: "Dr. Mayank Sharma", photoUrl: "assets/doctors/Pi7_Tool_1000010329 - Mayank Sharma.jpg",
    title: "Doctor (MBBS)", qualifications: "MBBS",
    experienceYears: 2, specializationsTop: ["Sexual Wellness","Psychological Disorders","Trauma & Sleep Disorders"],
    specializationsFull: ["Anxiety","Depression","Sleep disorders","Stress management","Addiction","Anger Management","Sexual Dysfunctions","Trauma","PTSD"],
    languages: ["Hindi","English"], city: "Roorkee", state: "Uttarakhand",
    availabilitySummary: "Mon-Sat, 6pm-12am (WFH)",
    bio: "I am Dr Mayank Sharma (MBBS), with 2 years of work experience in critical care and counselling of patients along with their family members, previously serving as a medical officer with the Uttarakhand government.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d16", name: "Suneela Kathuria", photoUrl: "assets/doctors/IMG-20250911-WA0005 - Suneela Kathuria.jpg",
    title: "Counselling Psychologist", qualifications: "Master's in Psychology",
    experienceYears: 22, specializationsTop: ["Career","Academic","Child & Youth"],
    specializationsFull: ["Anxiety","Stress management","Addiction","Self improvement","Anger Management","Grief & Loss","Eating Disorders","Work-Life balance","Academic concerns","Career confusion"],
    languages: ["Hindi","English","Punjabi"], city: "Gurugram", state: "Haryana",
    availabilitySummary: "Mon-Fri, 6pm-8pm (WFH)",
    bio: "I am Suneela, Counselling Psychologist with 22+ years of experience dealing with mental health issues across all age groups. I love creating and restoring a safe space for each person who comes into my care.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d17", name: "Zainab Hashim", photoUrl: "assets/doctors/camera - Zainab Hashim.jpg",
    title: "Psychology Trainee / Peer Counsellor", qualifications: "BA (Hons) Applied Psychology, MA Clinical Psychology",
    experienceYears: 2, specializationsTop: ["Relationship","Career","Sexual Wellness","Academic"],
    specializationsFull: ["Anxiety","Depression","Stress management","Self improvement","Overthinking","Work-Life balance","Relationship skills","Academic concerns","Career confusion"],
    languages: ["Hindi","English"], city: "New Delhi", state: "Delhi",
    availabilitySummary: "All week, 5am-11am weekdays / 9am-3pm weekend",
    bio: "I am Zainab Hashim, an aspiring clinical psychologist with hands-on experience in leading hospitals and research institutes, skilled in psychological assessments, CBT, counseling, and research.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d18", name: "Aditi Yadav", photoUrl: "assets/doctors/IMG_033244_0 - Aditi Yadav.jpeg",
    title: "Counselling Psychologist", qualifications: "B.A. (Hons) Psychology, Master's in Psychology, PGD Counselling Psychology, Art Therapy Practitioner",
    experienceYears: 2, specializationsTop: ["Relationship","Career","Academic"],
    specializationsFull: ["Anxiety","Depression","Stress management","Self improvement","Overthinking","Trauma","PTSD","Life transitions","Work-Life balance","Relationship skills","Academic concerns"],
    languages: ["Hindi","English"], city: "Lucknow", state: "Uttar Pradesh",
    availabilitySummary: "Mon-Sat, 6pm-11pm",
    bio: "My work focuses on supporting individuals who feel anxious, overwhelmed, or caught in patterns of self-doubt and overthinking, helping them build emotional awareness, healthier boundaries, and a kinder relationship with themselves.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d19", name: "Samarth P Shetty", photoUrl: "assets/doctors/IMG-20251202-WA0021 - Peepal Tree.jpg",
    title: "Counselling Psychologist (Founder)", qualifications: "MA Psychology, Certified CBT (NIMHANS), Suicide Prevention & Life Skills",
    experienceYears: 15, featured: true, specializationsTop: ["15+ Yrs Practice","NIMHANS Certified","Geriatric & Family"],
    specializationsFull: ["Anxiety","Depression","Addiction","Trauma","PTSD","LGBTQIA+ concerns","Personality Disorders","Bipolar disorder","Geriatric Mental Health","Work-Life balance","Relationship skills","Family counselling"],
    languages: ["Hindi","English","Kannada"], city: "Bangalore", state: "Karnataka",
    availabilitySummary: "Mon-Sat, flexible outside early morning hours",
    bio: "Founder of By The Peepal Tree, with 15+ years as a certified counselling psychologist trained in CBT and REBT, focused on helping individuals develop a rationally positive outlook, including 13 years as Volunteer Counselling Psychologist at Samadhana Counseling Centre.",
    bioQuote: "Founder & NIMHANS-certified practitioner with 15+ years helping clients cultivate rational positivity and strength.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d20", name: "Varshini Y", photoUrl: "assets/doctors/20220907_174142 - VARSHINI YADU SHANKAR.jpg",
    title: "Clinical Psychologist", qualifications: "MSc Clinical Psychology, BSc (Botany, Zoology, Psychology)",
    experienceYears: 2, specializationsTop: ["Relationship","Academic","Psychological Disorders"],
    specializationsFull: ["Anxiety","Depression","Sleep disorders","Addiction","Anger Management","Grief & Loss","OCD","Mood disorders","Adult ADHD","Relationship skills"],
    languages: ["English","Telugu","Tamil","Kannada"], city: "Bengaluru", state: "Karnataka",
    availabilitySummary: "Mon-Fri & Sun, 4pm-10pm",
    bio: "Varshini is a Clinical Psychologist who believes healing begins when individuals feel truly heard, using an integrative evidence-based approach drawing from CBT, DBT, ACT, and REBT across hospitals, clinics, and rehabilitation settings.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d21", name: "Akshata", photoUrl: "assets/doctors/8eab6f09-4da0-402e-84af-d6a442fa8c70 - Akshata K s.jpeg",
    title: "Clinical Psychologist", qualifications: "MSc Clinical Psychology",
    experienceYears: 2, specializationsTop: ["Relationship","Sexual Wellness","Psychological Disorders","Child & Youth"],
    specializationsFull: ["Anxiety","Depression","Sleep disorders","Addiction","Anger Management","Sexual Dysfunctions","OCD","LGBTQIA+ concerns","Trauma","PTSD","Personality Disorders","Bipolar disorder"],
    languages: ["Hindi","English","Tamil","Kannada"], city: "Bangalore", state: "Karnataka",
    availabilitySummary: "Mon/Tue/Wed/Thu/Sun, 2pm-4pm",
    bio: "I'm Akshata K S, a Clinical Psychologist who believes healing begins with being truly heard, working with clients across ADHD, OCD, Borderline Personality Disorder, Bipolar Disorder, Depression, and Anxiety through CBT, REBT, DBT, and ACT.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  },
  {
    id: "d22", name: "Megha Gupta", photoUrl: "assets/doctors/Photo - Megha Gupta.jpg",
    title: "Counselling Psychologist (Founder, Therapeutically Yours)", qualifications: "B.El.Ed, MSc Counselling Psychology, PGD Guidance & Counselling, Certificate in Trauma-Informed Psychosocial Care",
    experienceYears: 3, specializationsTop: ["Relationship","Academic","Child & Youth"],
    specializationsFull: ["Anxiety","Depression","Sleep disorders","Anger Management","Overthinking","Grief & Loss","Trauma","PTSD","Eating Disorders","Work-Life balance","Relationship skills","Career confusion"],
    languages: ["Hindi","English"], city: "Delhi", state: "Delhi",
    availabilitySummary: "Mon/Tue/Wed/Sat/Sun, flexible across day",
    bio: "Megha Gupta is a Counselling Psychologist and founder of Therapeutically Yours, working from an integrative lens grounded in ACT, person-centred therapy, and polyvagal-informed practice, registered with the NHA and a member of the APA.",
    price: "Contact for pricing", sessionDuration: "50 min", rating: null, reviewCount: 0
  }
];

const MYTRM_DATA = {
  categories: [
    {
      id: "anxiety",
      title: "Anxiety & Panic",
      description: "Manage intrusive thoughts, restlessness, and sudden worry with actionable grounding techniques.",
      icon: "wind",
      image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=600",
      count: "12 Therapists"
    },
    {
      id: "stress",
      title: "Stress & Workload",
      description: "Navigate workplace pressure, deadline fatigue, and mental clutter before reaching burnout.",
      icon: "feather",
      image: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&q=80&w=600",
      count: "15 Therapists"
    },
    {
      id: "relationships",
      title: "Relationships & Communication",
      description: "Build healthier boundaries, resolve conflict, and heal attachment patterns in personal life.",
      icon: "heart",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=600",
      count: "10 Therapists"
    },
    {
      id: "burnout",
      title: "Burnout & Fatigue",
      description: "Restore emotional reserves, reconnect with motivation, and re-establish life pace.",
      icon: "battery-charging",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600",
      count: "8 Therapists"
    },
    {
      id: "self-esteem",
      title: "Self-Esteem & Identity",
      description: "Overcome imposter syndrome, self-doubt, and cultivate genuine self-compassion.",
      icon: "smile",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
      count: "11 Therapists"
    },
    {
      id: "career",
      title: "Career & Life Transitions",
      description: "Gain clarity during job switches, graduation, quarter-life crises, and major decisions.",
      icon: "compass",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600",
      count: "9 Therapists"
    },
    {
      id: "overthinking",
      title: "Overthinking & Sleep",
      description: "Break chronic rumination loops, calm midnight worries, and restore restful sleep patterns.",
      icon: "moon",
      image: "https://images.unsplash.com/photo-1511295742362-92c96b124e52?auto=format&fit=crop&q=80&w=600",
      count: "14 Therapists"
    },
    {
      id: "personal-growth",
      title: "Personal Growth & Purpose",
      description: "Explore values, cultivate emotional intelligence, and align daily habits with long-term vision.",
      icon: "sun",
      image: "https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&q=80&w=600",
      count: "13 Therapists"
    }
  ],

  therapists: doctors,
  doctors: doctors,

  testimonials: [
    {
      id: 1,
      quote: "MYTRM made finding a therapist who understands urban young adult life in India so effortless. Neetee helped me navigate my corporate anxiety without any judgment.",
      name: "Rhea Deshmukh",
      role: "Product Designer, 26",
      city: "Mumbai",
      photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 2,
      quote: "As a college student, therapy always felt intimidating and expensive. MYTRM’s transparent pricing and easy online booking made it accessible and warm.",
      name: "Aditya Verma",
      role: "Undergraduate Student, 21",
      city: "Delhi",
      photo: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: 3,
      quote: "The interface is calm, beautiful, and respects your privacy. Booking my first session took less than 2 minutes, and it was the best choice I made this year.",
      name: "Sanya Roy",
      role: "Content Lead, 28",
      city: "Bengaluru",
      photo: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400"
    }
  ],

  faqs: [
    {
      question: "How do online therapy sessions work on MYTRM?",
      answer: "Once you select a therapist and complete booking, you will receive a secure video call link via email and on your dashboard. You can join the session directly from your laptop or smartphone in a private room."
    },
    {
      question: "Are all therapists on MYTRM licensed and verified?",
      answer: "Yes, 100%. Every professional on MYTRM holds a Master's degree or Ph.D. in Clinical or Counseling Psychology from recognized institutions and undergoes rigorous background checks and clinical interviews."
    },
    {
      question: "Is my privacy and confidential information safe?",
      answer: "Absolutely. All session data, video calls, and personal notes are end-to-end encrypted. We adhere strictly to APA and Indian clinical confidentiality guidelines."
    },
    {
      question: "Can I reschedule or cancel my appointment?",
      answer: "Yes! You can reschedule or cancel free of charge up to 24 hours before your scheduled session time directly from your user dashboard."
    },
    {
      question: "How do I choose the right therapist for me?",
      answer: "You can filter therapists by concern (e.g. Anxiety, Career, Relationships), language, price range, and gender. You can also view detailed video bios and therapist approaches on their profile page."
    }
  ]
};

// Helper to save bookings locally
function getStoredBookings() {
  try {
    const data = localStorage.getItem("mytrm_user_bookings");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
}

function saveBookingToStorage(booking) {
  const current = getStoredBookings();
  current.unshift(booking);
  localStorage.setItem("mytrm_user_bookings", JSON.stringify(current));
}

// Helper for saved/bookmarked therapists
function getSavedTherapists() {
  try {
    const data = localStorage.getItem("mytrm_saved_therapists");
    return data ? JSON.parse(data) : ["d01", "d03"];
  } catch (e) {
    return ["d01", "d03"];
  }
}

function toggleSaveTherapist(therapistId) {
  let saved = getSavedTherapists();
  if (saved.includes(therapistId)) {
    saved = saved.filter(id => id !== therapistId);
  } else {
    saved.push(therapistId);
  }
  localStorage.setItem("mytrm_saved_therapists", JSON.stringify(saved));
  return saved.includes(therapistId);
}
