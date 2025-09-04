import { Service } from '../types';

export const services: Service[] = [
  {
    id: '1',
    title: 'التوصيل المجاني',
    description: 'توصيل مجاني لجميع الطلبات أكثر من 100 ريال',
    icon: '🚚',
    image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'توصيل سريع خلال ساعتين',
      'تتبع الطلب مباشرة',
      'توصيل آمن ومضمون',
      'خدمة عملاء 24/7'
    ]
  },
  {
    id: '2',
    title: 'استشارة صيدلي',
    description: 'استشارة مجانية مع صيادلة مختصين',
    icon: '👨‍⚕️',
    image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'استشارة مجانية',
      'صيادلة مرخصون',
      'متاح 24/7',
      'خصوصية تامة'
    ]
  },
  {
    id: '3',
    title: 'برنامج الولاء',
    description: 'اكسب نقاط مع كل عملية شراء واستبدلها بخصومات',
    icon: '🎁',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'نقاط مع كل شراء',
      'خصومات حصرية',
      'عروض خاصة للأعضاء',
      'هدايا مجانية'
    ]
  },
  {
    id: '4',
    title: 'الفحوصات الطبية',
    description: 'فحوصات طبية شاملة في الفروع',
    icon: '🔬',
    image: 'https://images.pexels.com/photos/4386467/pexels-photo-4386467.jpeg?auto=compress&cs=tinysrgb&w=600',
    features: [
      'فحص السكري',
      'قياس الضغط',
      'فحص الكوليسترول',
      'نتائج فورية'
    ]
  }
];