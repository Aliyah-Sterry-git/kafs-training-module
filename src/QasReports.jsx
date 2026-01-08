// src/QASReports.jsx
import React from "react";
import { FaFilePdf } from "react-icons/fa";
import policy1Img from "./assets/policy1.jpg";
import policy2Img from "./assets/policy2.jpg";
import policy3Img from "./assets/policy3.jpg";

export default function QASReports() {
  const policies = [
    {
      title: "KAFS Actuarial Work Review Policy",
      description:
        "Framework for reviewing actuarial work to ensure accuracy, objectivity, and compliance with professional standards. Includes peer-review, sign-off processes, and documentation requirements.",
      file: "/pdfs/actuarial-work-review.pdf",
      img: policy1Img,
    },
    {
      title: "KAFS Training & Development Policy",
      description:
        "Emphasizes continuous learning, mentorship, and skills enhancement. Defines programs, workshops, and performance evaluations to support employee development.",
      file: "/pdfs/training-development.pdf",
      img: policy2Img,
    },
    {
      title: "KAFS Data Protection Policy",
      description:
        "Explains how KAFS safeguards personal and sensitive data in compliance with Kenya’s Data Protection Act (2019), the Actuaries’ Code, and global standards.",
      file: "/pdfs/data-protection.pdf",
      img: policy3Img,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans px-6 py-16 -mt-20">
      {/* Hero / Intro */}
      <div className="w-full mb-20 md:mb-24 px-2 md:px-6">
        <h1 className="text-3xl md:text-3xl font-bold text-left text-purple-300 mb-2">
          QAS Reports & Policies
        </h1>
        {/* very thin subtle underline */}
        <div className="w-16 h-[1.5px] bg-[#00E5FF] mb-6 rounded-full" />

        <p className="text-lg md:text-md text-gray-300 leading-relaxed text-left max-w-full">
          Explore our key policies and reports that guide actuarial work, data
          protection, and professional development at KAFS. They are part of our{" "}
          <span className="text-purple-400 font-semibold">
            Quality Assurance Scheme (QAS)
          </span>{" "}
          and ensure <span className="text-purple-400">high standards</span>,{" "}
          <span className="text-purple-400">compliance</span>, and{" "}
          <span className="text-purple-400">continuous improvement</span>.
        </p>
      </div>

      {/* Interactive Policy Tiles */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
        {policies.map((policy, index) => (
          <div
            key={index}
            className="relative group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
          >
            {/* Policy Image */}
            <img
              src={policy.img}
              alt={policy.title}
              className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-4">
              <h2 className="text-xl font-semibold text-purple-300 mb-2">
                {policy.title}
              </h2>
              <p className="text-gray-200 text-sm mb-3 line-clamp-3">
                {policy.description}
              </p>
              <a
                href={policy.file}
                download
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600/80 hover:bg-purple-500/90 text-white font-medium transition border border-[#00E5FF]/40 hover:border-[#00E5FF]"
              >
                <FaFilePdf />
                Download PDF
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
