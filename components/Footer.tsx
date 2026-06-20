import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full bg-[#2C2C2C] text-[#EFE9DF] pt-16 pb-8 border-t border-olive/20 animate-fade-in delay-500">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Column 1: Brand & Intro */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 space-y-6">
            <Link href="/" className="inline-block bg-cream p-2 rounded-lg">
              <Image 
                src="/logo.png" 
                alt="EpicQuest" 
                width={160} 
                height={65} 
                className="h-10 w-auto object-contain" 
              />
            </Link>
            <p className="text-sm text-[#D1CBBB] leading-relaxed font-sans pr-4">
              We transform extraordinary high school students into Ivy League-ready candidates through structured research, patent filing, and real-world apprenticeships.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-sm font-sans text-white mb-6 font-bold uppercase tracking-[0.18em]">Platform</h4>
            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest text-[#D1CBBB]">
              <li><Link href="/about" className="hover:text-amber transition-colors">About Us</Link></li>
              <li><Link href="/blog" className="hover:text-amber transition-colors">Blog</Link></li>
              <li><Link href="/skills" className="hover:text-amber transition-colors">Skills Academy</Link></li>
              <li><Link href="/programs" className="hover:text-amber transition-colors">Our Programs</Link></li>
              <li><Link href="/the-epicquest-method" className="hover:text-amber transition-colors">The EpicQuest Method</Link></li>
              <li><Link href="/results" className="hover:text-amber transition-colors">Success Stories</Link></li>
              <li><Link href="/team" className="hover:text-amber transition-colors">Our Team</Link></li>
              <li><Link href="/test" className="hover:text-amber transition-colors">Diagnostic Report</Link></li>
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h4 className="text-sm font-sans text-white mb-6 font-bold uppercase tracking-[0.18em]">Programs</h4>
            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest text-[#D1CBBB]">
              <li><Link href="/programs/applied-research" className="hover:text-amber transition-colors">Applied Research</Link></li>
              <li><Link href="/programs/prototype-development" className="hover:text-amber transition-colors">Prototype Development</Link></li>
              <li><Link href="/programs/policy-drafts" className="hover:text-amber transition-colors">Policy Drafts</Link></li>
              <li><Link href="/programs/patent-filing" className="hover:text-amber transition-colors">Patent Filing</Link></li>
              <li><Link href="/programs/apprenticeships" className="hover:text-amber transition-colors">Apprenticeships</Link></li>
            </ul>
          </div>

          {/* Column 4: Skills */}
          <div>
            <h4 className="text-sm font-sans text-white mb-6 font-bold uppercase tracking-[0.18em]">Skills Academy</h4>
            <ul className="space-y-3 text-[11px] font-bold uppercase tracking-widest text-[#D1CBBB]">
              <li><Link href="/skills/ai-ml-data-science" className="hover:text-amber transition-colors">AI / ML & Data Science</Link></li>
              <li><Link href="/skills/applied-finance-investment-banking" className="hover:text-amber transition-colors">Applied Finance & IB</Link></li>
              <li><Link href="/skills/robotics-drone-science" className="hover:text-amber transition-colors">Robotics & Drone</Link></li>
              <li><Link href="/skills/policy-economics-diplomacy" className="hover:text-amber transition-colors">Policy & Diplomacy</Link></li>
              <li><Link href="/skills/research-patent-incubator" className="hover:text-amber transition-colors">Research & Patent</Link></li>
            </ul>
          </div>

          {/* Column 5: Contact */}
          <div>
            <h4 className="text-sm font-sans text-white mb-6 font-bold uppercase tracking-[0.18em]">Contact</h4>
            <ul className="space-y-4 text-[11px] font-bold uppercase tracking-widest text-[#D1CBBB]">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-olive shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <span>New Delhi, India<br/>(Operating Globally)</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-olive shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.157-.44.009-.926.387-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                <a href="tel:+919971125276" className="hover:text-amber transition-colors">+91-9971125276</a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-olive shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                <a href="mailto:contact@epicquestlearning.com" className="hover:text-amber transition-colors break-all">
                  contact@epicquestlearning.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#A8A295]">
          <p>© {new Date().getFullYear()} EpicQuest Learning. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
