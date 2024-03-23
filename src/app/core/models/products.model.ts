export interface IPRODUCTS {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: IRATING;
}
interface IRATING {
  rate: number;
  count: number;
}
