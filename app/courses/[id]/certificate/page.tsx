'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Download, ArrowLeft, Award, Calendar, Clock, Loader2 } from 'lucide-react';
import { checkCertificateAvailable, downloadCertificate } from '@/lib/api/courses';
import { downloadCertificate as clientDownloadCertificate } from '@/lib/services/certificate-service';
import { getCourseById } from '@/lib/api/courses';
import type { Course } from '@/lib/courses-data';

export default function CertificatePage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [certificateId, setCertificateId] = useState<string>('');
  const [issuedAt, setIssuedAt] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        
        // Fetch course details
        const courseData = await getCourseById(courseId);
        setCourse(courseData);
        
        // Check certificate availability
        const certCheck = await checkCertificateAvailable(courseId);
        
        if (certCheck) {
          setIsAvailable(certCheck.isAvailable);
          setIsDownloaded(certCheck.isDownloaded);
          if (certCheck.certificateId) {
            setCertificateId(certCheck.certificateId);
          }
          if (certCheck.issuedAt) {
            setIssuedAt(certCheck.issuedAt);
          }
          if (certCheck.message) {
            setMessage(certCheck.message);
          }
        }
      } catch (error) {
        console.error('Error loading certificate page:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    loadData();
  }, [courseId]);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Try server-side download first
      const blob = await downloadCertificate(courseId);
      
      if (blob) {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificate-${certificateId || courseId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsDownloaded(true);
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#ff8c00]" />
          <p className="text-sm text-[#666666] dark:text-[#94a3b8]">Loading certificate...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#0a0a0a]">
        <div className="text-center">
          <p className="text-lg font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">Course not found</p>
          <Link
            href="/courses"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#ff8c00] px-4 py-2 text-sm font-semibold text-[#ff8c00] hover:bg-[#ff8c00] hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f5f5f5] to-white dark:from-[#0a0a0a] dark:to-[#1a1a1a] py-12 px-4">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href={`/courses/${courseId}`}
            className="flex items-center gap-2 text-sm font-medium text-[#666666] hover:text-[#ff8c00] dark:text-[#94a3b8] dark:hover:text-[#ff8c00]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Course
          </Link>
        </div>

        {/* Certificate Card */}
        <div className="rounded-2xl border border-[#e0e0e0] bg-white shadow-xl dark:border-[#1f1f1f] dark:bg-[#111111] overflow-hidden">
          {/* Top stripe */}
          <div className="h-4 bg-gradient-to-r from-[#ff8c00] to-[#ff6b35]"></div>

          <div className="p-8 sm:p-12">
            {/* Icon and Title */}
            <div className="flex flex-col items-center gap-4 mb-8">
              <div className="rounded-full bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] p-4">
                <Award className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] bg-clip-text text-transparent">
                Certificate of Completion
              </h1>
            </div>

            {/* Course Info */}
            <div className="mb-8 space-y-3">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#ff8c00]/10 p-2">
                  <Award className="h-5 w-5 text-[#ff8c00]" />
                </div>
                <div>
                  <p className="text-xs text-[#666666] dark:text-[#94a3b8] uppercase tracking-wider">Course</p>
                  <p className="text-lg font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">{course.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#ff8c00]/10 p-2">
                  <Calendar className="h-5 w-5 text-[#ff8c00]" />
                </div>
                <div>
                  <p className="text-xs text-[#666666] dark:text-[#94a3b8] uppercase tracking-wider">Issued On</p>
                  <p className="text-lg font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">
                    {issuedAt ? new Date(issuedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    }) : 'Upon completion'}
                  </p>
                </div>
              </div>

              {certificateId && (
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-[#ff8c00]/10 p-2">
                    <Clock className="h-5 w-5 text-[#ff8c00]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#666666] dark:text-[#94a3b8] uppercase tracking-wider">Certificate ID</p>
                    <p className="text-lg font-semibold text-[#1a1a1a] dark:text-[#f1f5f9]">{certificateId}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Status */}
            <div className="mb-8">
              {isAvailable ? (
                <div className="rounded-xl border border-[#ff8c00] bg-[#ff8c00]/10 p-4 text-center">
                  <CheckCircle2 className="mx-auto h-8 w-8 text-[#ff8c00]" />
                  <p className="mt-2 font-semibold text-[#ff8c00]">Available for Download</p>
                  {isDownloaded && (
                    <p className="mt-1 text-xs text-[#666666] dark:text-[#94a3b8]">
                      Already downloaded
                    </p>
                  )}
                </div>
              ) : (
                <div className="rounded-xl border border-[#ff8c00] bg-[#ff8c00]/10 p-4 text-center">
                  <Clock className="mx-auto h-8 w-8 text-[#ff8c00]" />
                  <p className="mt-2 font-semibold text-[#ff8c00]">Not Available Yet</p>
                  <p className="mt-1 text-xs text-[#666666] dark:text-[#94a3b8]">
                    {message || 'Complete all lessons to unlock your certificate'}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              {isAvailable && (
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#ff8c00] to-[#ff6b35] px-6 py-3 font-semibold text-white shadow-lg shadow-[#ff8c00]/20 transition-all hover:shadow-xl hover:shadow-[#ff8c00]/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Downloading...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4" />
                      Download Certificate
                    </>
                  )}
                </button>
              )}

              <Link
                href={`/courses/${courseId}/learn/${course.curriculum[0]?.lessons[0]?.id || '1'}`}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-[#ff8c00] px-6 py-3 font-semibold text-[#ff8c00] transition-all hover:bg-[#ff8c00] hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
                Continue Learning
              </Link>
            </div>
          </div>
        </div>

        {/* Completion Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-[#e0e0e0] bg-white p-4 dark:border-[#1f1f1f] dark:bg-[#111111]">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#ff8c00]/10 p-2">
                <CheckCircle2 className="h-5 w-5 text-[#ff8c00]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
                  {course.curriculum.reduce((acc, section) => acc + section.lessons.length, 0)}
                </p>
                <p className="text-xs text-[#666666] dark:text-[#94a3b8]">Lessons Completed</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#e0e0e0] bg-white p-4 dark:border-[#1f1f1f] dark:bg-[#111111]">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-[#ff8c00]/10 p-2">
                <Award className="h-5 w-5 text-[#ff8c00]" />
              </div>
              <div>
                <p className="text-2xl font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">100%</p>
                <p className="text-xs text-[#666666] dark:text-[#94a3b8]">Course Completion</p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-8 rounded-xl border border-[#e0e0e0] bg-white p-6 dark:border-[#1f1f1f] dark:bg-[#111111]">
          <h3 className="mb-4 text-lg font-bold text-[#1a1a1a] dark:text-[#f1f5f9]">
            About Your Certificate
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8c00]" />
              <span className="text-sm text-[#444444] dark:text-[#94a3b8]">
                Official certificate from DIGENTIC TECH
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8c00]" />
              <span className="text-sm text-[#444444] dark:text-[#94a3b8]">
                Unique certificate ID for verification
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8c00]" />
              <span className="text-sm text-[#444444] dark:text-[#94a3b8]">
                Can be shared on LinkedIn and other professional networks
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#ff8c00]" />
              <span className="text-sm text-[#444444] dark:text-[#94a3b8]">
                Printable PDF format
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
