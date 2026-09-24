import { AboutSnapshot } from '@/components/home/AboutSnapshot';
import { DigitalAssetsPreview } from '@/components/home/DigitalAssetsPreview';
import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { HeroSection } from '@/components/home/HeroSection';
import { LatestBlogPosts } from '@/components/home/LatestBlogPosts';
import { Testimonials } from '@/components/home/Testimonials';

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSnapshot />
      <FeaturedProjects />
      <FeaturedCourses />
      <LatestBlogPosts />
      <DigitalAssetsPreview />
      <Testimonials />
    </>
  );
}
