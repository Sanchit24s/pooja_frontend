import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

interface Ritual {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface RitualCategory {
  id: string;
  name: string;
  image: string;
  description: string;
  rituals: Ritual[];
}

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  selectedCategory: RitualCategory | null = null;
  categories: RitualCategory[] = [
    {
      id: 'havans',
      name: 'Havans',
      image: 'assets/images/havans.jpg',
      description: 'Sacred fire rituals performed to invoke deities',
      rituals: [
        {
          id: 'navagraha',
          name: 'Navagraha Havan',
          description: 'Performed to appease all the nine grahas to reduce the malefic effects of the planets in a person\'s life.',
          image: 'assets/images/navagraha_havan.jpg'
        },
        {
          id: 'chandi',
          name: 'Chandi Havan',
          description: 'A powerful Vedic ritual dedicated to Goddess Chandi for success, prosperity, and protection from negative influences.',
          image: 'assets/images/chandi_havan.jpg'
        },
        {
          id: 'ayush',
          name: 'Ayush Havan',
          description: 'Creates positive vibrations and shields against diseases and health disorders.',
          image: 'assets/images/ayush_havan.jpg'
        },
        {
          id: 'dhanvantri',
          name: 'Dhanvantri Havan',
          description: 'A Vedic fire ritual performed to invoke Lord Dhanvantari for health and longevity.',
          image: 'assets/images/dhanvantri_havan.jpg'
        },
        {
          id: 'rahu-brihaspati',
          name: 'Rahu Brihaspati Sandhi Shanti Havan',
          description: 'A remedy to neutralize negative effects of Rahu Mahadasha transitioning into Guru Mahadasha.',
          image: 'assets/images/rahu-brihaspati_havan.jpg'
        },
        {
          id: 'laxmi-kubera',
          name: 'Laxmi Kubera Havan',
          description: 'A Vedic ritual to attract financial stability and prosperity.',
          image: 'assets/images/laxmi-kubera_havan.jpg'
        },
        {
          id: 'gayatri',
          name: 'Gayatri Havan',
          description: 'Invokes blessings of the Sun, eradicates past-life sins, and bestows divine wisdom.',
          image: 'assets/images/gayatri_havan.jpg'
        }
      ]
    },
    {
      id: 'paths',
      name: 'Paths',
      image: 'assets/images/paths.jpg',
      description: 'Sacred recitations and readings of holy texts',
      rituals: [
        {
          id: 'akhand-ramayan',
          name: 'Akhand Ramayan Path',
          description: 'Continuous recital of Ramcharit manas to get blessings and peaceful life.',
          image: 'assets/images/akhand-ramayan-path.jpg'
        },
        {
          id: 'hanuman-chalisa',
          name: 'Hanuman Chalisa Path',
          description: 'Helps to get total focus over mind and body, and rid of all fear.',
          image: 'assets/images/hanuman-chalisa-path.jpg'
        },
        {
          id: 'vishnu-sahasranam',
          name: 'Vishnu Sahasranam Path',
          description: 'Helps to get blessings from Lord Vishnu for desired results.',
          image: 'assets/images/vishnu-sahasranam-path.jpg'
        },
        {
          id: 'chandi-path',
          name: 'Chandi Path (Durga Saptashati Path)',
          description: 'Protects and helps overcome troubles and sufferings.',
          image: 'assets/images/chandi-path.jpg'
        },
        {
          id: 'sunderkand',
          name: 'Sunderkand Path',
          description: 'Gives mental and physical strength and helps in getting rid of Daridrata and illness.',
          image: 'assets/images/sunderkand-path.jpg'
        }
      ]
    },
    {
      id: 'festivals',
      name: 'Festivals',
      image: 'assets/images/festivals.jpg',
      description: 'Celebrations of auspicious days and events',
      rituals: [
        {
          id: 'dussehra',
          name: 'Dussehra',
          description: 'Celebrates the triumph of good over evil and falls on the tenth day after Navratri.',
          image: 'assets/images/dussehra.jpg'
        },
        {
          id: 'janmashtami',
          name: 'Janmashtami Puja',
          description: 'Celebration of Lord Krishna\'s birth, considered very auspicious.',
          image: 'assets/images/janmashtami.jpg'
        },
        {
          id: 'tulsi-vivah',
          name: 'Tulsi Vivah Puja',
          description: 'Involves the marriage between Lord Krishna and Tulsi Plant.',
          image: 'assets/images/tulsi-vivah.jpg'
        },
        {
          id: 'ganesh',
          name: 'Ganesh Sthapana and Visarjan Puja',
          description: 'Performed for Lord Ganapathi who removes obstacles and negative energies.',
          image: 'assets/images/ganesh.jpg'
        },
        {
          id: 'diwali',
          name: 'Diwali Lakshmi Puja',
          description: 'Performed to gain wealth and financial stability by appeasing Goddess Lakshmi.',
          image: 'assets/images/diwali.jpg'
        },
        {
          id: 'navratri',
          name: 'Navratri Kalash Sthapana Puja',
          description: 'Celebrated in glory of Mata Durga, performed on first day of Navratri.',
          image: 'assets/images/navratri.jpg'
        }
      ]
    },
    {
      id: 'jaaps',
      name: 'Jaaps',
      image: 'assets/images/jaaps.jpg',
      description: 'Mantra repetitions for spiritual and planetary benefits',
      rituals: [
        {
          id: 'chandra',
          name: 'Chandra Graha Shanti Jaap',
          description: 'Nullifies malefic effects of the Chandra Graha dosh.',
          image: 'assets/images/chandra-jaap.jpg'
        },
        {
          id: 'guru',
          name: 'Guru Graha Shanti Jaap',
          description: 'Overcomes malefic effects of the Guru Graha dosh.',
          image: 'assets/images/guru-jaap.jpg'
        },
        {
          id: 'shani',
          name: 'Shani Graha Shanti Jaap',
          description: 'Overcomes malefic effects of Shani Graha that causes hurdles in life.',
          image: 'assets/images/shani-jaap.jpg'
        },
        {
          id: 'mangal',
          name: 'Mangal Graha Shanti Jaap',
          description: 'Overcomes malefic effects of the Mangal Graha dosha.',
          image: 'assets/images/mangal-jaap.jpg'
        },
        {
          id: 'ketu',
          name: 'Ketu Graha Shanti Jaap',
          description: 'Overcomes bad effects of the Ketu Graha dosha.',
          image: 'assets/images/ketu-jaap.jpg'
        },
        {
          id: 'gayatri-mantra',
          name: 'Gayatri Mantra Jaap',
          description: 'Brings blessings of the Sun and eradicates sins of past life.',
          image: 'assets/images/gayatri-mantra-jaap.jpg'
        },
        {
          id: 'maha-mrityunjaya',
          name: 'Maha Mrityunjaya Jaap',
          description: 'Performed to receive blessings of Shivji to avoid untimely death.',
          image: 'assets/images/maha-mrityunjaya-jaap.jpg'
        },
        {
          id: 'shukra',
          name: 'Shukra Graha Shanti Jaap',
          description: 'Gives power to control sense organs and enables happy life.',
          image: 'assets/images/shukra-jaap.jpg'
        },
        {
          id: 'budha',
          name: 'Budha Graha Shanti Jaap',
          description: 'Overcomes bad effects of the Budha Graha Dosh.',
          image: 'assets/images/budha-jaap.jpg'
        }
      ]
    },
    {
      id: 'shanti',
      name: 'Shanti Pujas',
      image: 'assets/images/shanti-pujas.jpg',
      description: 'Rituals to neutralize negative planetary influences',
      rituals: [
        {
          id: 'angaraka',
          name: 'Angaraka Dosh / Kuja Dosh Shanti',
          description: 'Addresses dosha associated with marital problems and financial instability.',
          image: 'assets/images/angaraka-shanti.jpg'
        },
        {
          id: 'kaal-sarp',
          name: 'Kaal Sarp Dosh Puja',
          description: 'Neutralizes negative planetary effects when planets are positioned between Rahu and Ketu.',
          image: 'assets/images/kaal-sarp-shanti.jpg'
        },
        {
          id: 'graha-yog',
          name: 'Graha Yog Shanti Puja',
          description: 'Pacifies the Navagrahas and removes Graha Dosha from a horoscope.',
          image: 'assets/images/graha-yog-shanti.jpg'
        },
        {
          id: 'guru-chandal',
          name: 'Guru Chandal Yoga Shanti',
          description: 'Neutralizes negative effects of conjunction of Guru with Rahu or Ketu.',
          image: 'assets/images/guru-chandal-shanti.jpg'
        },
        {
          id: 'vyatipat',
          name: 'Vyatipat Yoga Shanti',
          description: 'Removes negative effects of Vyatipat Yoga for children born in this yoga.',
          image: 'assets/images/vyatipat-shanti.jpg'
        },
        {
          id: 'shani-dosha',
          name: 'Shani Dosha Shanthi Pooja',
          description: 'Addresses Shani Ketu Shrapit Dosh causing financial instability and career setbacks.',
          image: 'assets/images/shani-dosha-shanti.jpg'
        }
      ]
    },
    {
      id: 'divine',
      name: 'Divine Consultancy',
      image: 'assets/images/divine.jpg',
      description:
        'Providing expert guidance in astrology, numerology, vastu, and spiritual healing to help individuals align with their life’s purpose.',
      rituals: [
        {
          id: 'horoscope',
          name: 'Horoscope',
          description:
            "is an astrological chart or diagram representing the positions of the Sun, Moon, planets, astrological aspects and sensitive angles at the time of an event, such as the moment of a person's birth.",
          image: 'assets/images/horoscope.jpg',
        },
        {
          id: 'healing',
          name: 'Healing',
          description:
            'can mean the process of becoming well again after an injury or disease, or the process of overcoming a painful emotion.',
          image: 'assets/images/healing.jpg',
        },
        {
          id: 'nemrology',
          name: 'Nemrology',
          description:
            'Numerology known as the belief in an occult, divine or mystical relationship between a number and one or more coinciding events.',
          image: 'assets/images/nemrology.jpg',
        },
        {
          id: 'astrology',
          name: 'Astrology',
          description:
            'Astrology is the practice of interpreting the positions of celestial bodies to predict human events.',
          image: 'assets/images/astrology.jpg',
        },
        {
          id: 'vastu_shastr',
          name: 'Vastu Shastr',
          description:
            'Vastu Shastra is an ancient Indian system of architecture and design that aims to create harmony between a building and natural elements.',
          image: 'assets/images/vastu_shastr.jpg',
        },
        {
          id: 'chiromancy',
          name: 'Chiromancy/Hand reading',
          description:
            'is a form of fortune-telling, and chiromancers look closely at the different lines on your palm to make predictions about your career, love life, and happiness.',
          image: 'assets/images/chiromancy.jpg',
        },
        {
          id: 'stones',
          name: 'Stones/Navratna',
          description: `A Navratna is a gemstone that represents a person's birth period, usually the month or zodiac sign.Note:-(All types of stone are available  is pandit jis.)`,
          image: 'assets/images/stones.jpg',
        },
      ],
    },
    {
      id: 'others',
      name: 'Other Rituals',
      image: 'assets/images/other.jpg',
      description: 'Special ceremonies for specific purposes',
      rituals: [
        {
          id: 'ark-vivah',
          name: 'Ark Vivah For Male',
          description: 'Sacred ritual for men with Manglik Dosha for harmonious married life.',
          image: 'assets/images/ark-vivah.jpg'
        },
        {
          id: 'vishnu-vivah',
          name: 'Vishnu Vivah For Female',
          description: 'Ritual for women with Manglik Dosha for obstacle-free married life.',
          image: 'assets/images/vishnu-vivah.jpg'
        },
        {
          id: 'ekadashi',
          name: 'Ekadashi Vrat Udyapan Puja',
          description: 'Marks successful completion of Ekadashi Vrat.',
          image: 'assets/images/ekadashi.jpg'
        },
        {
          id: 'engagement',
          name: 'Engagement Puja – Sagai',
          description: 'Pre-wedding ritual where families formally agree on marriage.',
          image: 'assets/images/engagement.jpg'
        },
        {
          id: 'surya',
          name: 'Surya Puja',
          description: 'Honors Lord Surya for wisdom, strength, and prosperity.',
          image: 'assets/images/surya-puja.jpg'
        },
        {
          id: 'udaka',
          name: 'Udaka Shanti Puja',
          description: 'Ensures peace, prosperity, and spiritual purification.',
          image: 'assets/images/udaka-puja.jpg'
        },
        {
          id: 'jagran',
          name: 'Jagran Puja',
          description: 'Night ritual praising the Lord with Kirtans and Bhajans.',
          image: 'assets/images/jagran.jpg'
        },
        {
          id: 'kumbh-vivah',
          name: 'Kumbh Vivah',
          description: 'Traditional Hindu wedding ceremony involving marrying a tree, idol, or pot.',
          image: 'assets/images/navagraha_havan.jpg'
        },
        {
          id: 'horoscope',
          name: 'Horoscope',
          description: "is an astrological chart or diagram representing the positions of the Sun, Moon, planets, astrological aspects and sensitive angles at the time of an event, such as the moment of a person's birth.",
          image: 'assets/images/horoscope.jpg'
        },
        {
          id: 'healing',
          name: 'Healing',
          description: 'can mean the process of becoming well again after an injury or disease, or the process of overcoming a painful emotion.',
          image: 'assets/images/healing.jpg'
        },

      ]
    }
  ];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.route.params.subscribe(params => {
      const categoryId = params['id'];
      if (categoryId) {
        // Find the selected category based on the ID parameter
        this.selectedCategory = this.categories.find(cat => cat.id === categoryId) || null;
      }
    });
  }

  // Navigate between categories within the categories view
  selectCategory(category: RitualCategory): void {
    this.selectedCategory = category;
    this.router.navigate(['/poojas', category.id]);
  }

  // Navigate back to services page
  goBack(): void {
    this.router.navigate(['/']);
  }
}