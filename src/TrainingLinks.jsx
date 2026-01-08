import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  Grid,
  HardDrive,
  BarChart2,
  Code,
  FileText,
  Database,
  ExternalLink,
} from "lucide-react";

export default function TrainingLinks() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-quart" });
  }, []);

  return (
    <div className="relative p-6 md:p-10 min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 text-white font-sans">
      {/* Background glow circles */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className="glow-circle w-[300px] h-[300px] top-[20%] left-[10%] bg-purple-500 absolute" />
        <div className="glow-circle w-[400px] h-[400px] bottom-[15%] right-[10%] bg-cyan-400 absolute" />
        <div className="glow-circle w-[250px] h-[250px] top-[50%] right-[30%] bg-blue-500 absolute" />
      </div>

      {/* Header */}
      <div className="text-center mb-12" data-aos="fade-down">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Training Resources
        </h1>
        <p className="text-gray-400 text-lg">
          Curated collection of premium courses to boost your skills
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Excel - Blue Theme */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300" data-aos="zoom-in">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-blue-400/20">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
              <Grid size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text">Excel</h2>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="training-link flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20 transition-colors">
                <span className="text-blue-100">Excel Advanced Formulas</span>
                <span className="link-source text-xs px-2 py-1 rounded bg-blue-500/30 text-blue-200 border border-blue-400/40">Udemy</span>
                <ExternalLink size={16} className="text-blue-300" />
              </a>
            </li>
            <li>
              <a href="#" className="training-link flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20 transition-colors">
                <span className="text-blue-100">Data Analysis with Excel</span>
                <span className="link-source text-xs px-2 py-1 rounded bg-blue-500/30 text-blue-200 border border-blue-400/40">Udemy</span>
                <ExternalLink size={16} className="text-blue-300" />
              </a>
            </li>
          </ul>
        </div>

        {/* Power Query - Blue Theme (Same as Excel) */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300" data-aos="zoom-in" data-aos-delay="100">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-blue-400/20">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
              <HardDrive size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text">Power Query</h2>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="training-link flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20 transition-colors">
                <span className="text-blue-100">Power Query for Data Transformation</span>
                <span className="link-source text-xs px-2 py-1 rounded bg-blue-500/30 text-blue-200 border border-blue-400/40">Udemy</span>
                <ExternalLink size={16} className="text-blue-300" />
              </a>
            </li>
          </ul>
        </div>

        {/* Statistics - Blue Theme (Same as Excel) */}
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 backdrop-blur-sm rounded-2xl border border-blue-400/30 p-6 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300" data-aos="zoom-in" data-aos-delay="200">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-blue-400/20">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30">
              <BarChart2 size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text">Statistics</h2>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="training-link flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-400/20 hover:bg-blue-500/20 transition-colors">
                <span className="text-blue-100">Probability & Statistics for Actuaries</span>
                <span className="link-source text-xs px-2 py-1 rounded bg-blue-500/30 text-blue-200 border border-blue-400/40">Udemy</span>
                <ExternalLink size={16} className="text-blue-300" />
              </a>
            </li>
          </ul>
        </div>

        {/* VBA - Purple Theme (Same as old Statistics) */}
        <div className="bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 backdrop-blur-sm rounded-2xl border border-purple-400/30 p-6 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300" data-aos="zoom-in" data-aos-delay="300">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-purple-400/20">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30">
              <Code size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text">VBA</h2>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="training-link flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-400/20 hover:bg-purple-500/20 transition-colors">
                <span className="text-purple-100">Excel VBA Automation</span>
                <span className="link-source text-xs px-2 py-1 rounded bg-purple-500/30 text-purple-200 border border-purple-400/40">Udemy</span>
                <ExternalLink size={16} className="text-purple-300" />
              </a>
            </li>
          </ul>
        </div>

        {/* Tableau - Purple Theme (Same as old Statistics) */}
        <div className="bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 backdrop-blur-sm rounded-2xl border border-purple-400/30 p-6 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300" data-aos="zoom-in" data-aos-delay="400">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-purple-400/20">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30">
              <FileText size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text">Tableau</h2>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="training-link flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-400/20 hover:bg-purple-500/20 transition-colors">
                <span className="text-purple-100">Tableau for Data Visualization</span>
                <span className="link-source text-xs px-2 py-1 rounded bg-purple-500/30 text-purple-200 border border-purple-400/40">Udemy</span>
                <ExternalLink size={16} className="text-purple-300" />
              </a>
            </li>
          </ul>
        </div>

        {/* SQL - Purple Theme (Same as old Statistics) */}
        <div className="bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10 backdrop-blur-sm rounded-2xl border border-purple-400/30 p-6 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300" data-aos="zoom-in" data-aos-delay="500">
          <div className="flex items-center gap-4 mb-4 pb-4 border-b border-purple-400/20">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-gradient-to-br from-purple-500 to-fuchsia-500 shadow-lg shadow-purple-500/30">
              <Database size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-fuchsia-300 bg-clip-text">SQL</h2>
          </div>
          <ul className="space-y-2">
            <li>
              <a href="#" className="training-link flex items-center justify-between p-3 rounded-lg bg-purple-500/10 border border-purple-400/20 hover:bg-purple-500/20 transition-colors">
                <span className="text-purple-100">SQL for Data Analysis</span>
                <span className="link-source text-xs px-2 py-1 rounded bg-purple-500/30 text-purple-200 border border-purple-400/40">Udemy</span>
                <ExternalLink size={16} className="text-purple-300" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}