import { HeroSection } from '@/components/home/HeroSection';
import { StatsBar } from '@/components/home/StatsBar';
import { AboutSnapshot } from '@/components/home/AboutSnapshot';
import { FeaturedProjects } from '@/components/home/FeaturedProjects';
import { LatestBlogPosts } from '@/components/home/LatestBlogPosts';
import { FeaturedCourses } from '@/components/home/FeaturedCourses';
import { DigitalAssetsPreview } from '@/components/home/DigitalAssetsPreview';
import { Testimonials } from '@/components/home/Testimonials';
import { NewsletterSignup } from '@/components/home/NewsletterSignup';

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <AboutSnapshot />
      <FeaturedProjects />
      <LatestBlogPosts />
      <FeaturedCourses />
      <DigitalAssetsPreview />
      <Testimonials />
      <NewsletterSignup />
    </>
  );
}
