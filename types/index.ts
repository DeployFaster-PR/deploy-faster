// Layout Components
export { default as Header } from '@/components/Header';
export { default as Footer } from '@/components/Footer';

export interface PageProps {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
}
