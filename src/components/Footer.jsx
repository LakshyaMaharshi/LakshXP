import React from 'react';
import { Rocket, Github, Star, Code, Copyright } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const githubProfile = "LakshyaMaharshi";
  const projectRepo = "LakshXP";

  return (
    <footer className="bg-gray-50 border-t py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">

          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm inline-flex items-center">
            <Rocket className="text-purple-600 mr-2" size={20} />
            <p className="text-gray-700 font-medium">
              Loving this application? Show your support by{' '}
              <a
                href={`https://github.com/${githubProfile}/${projectRepo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center"
              >
                <Star className="mx-1" size={16} fill="currentColor" />
                starring the GitHub repository
              </a>
            </p>
          </div>

          <div className="flex justify-center space-x-6 mb-6">
            <a
              href={`https://github.com/${githubProfile}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center"
              aria-label="Developer's GitHub Profile"
            >
              <Github className="mr-2" size={18} />
              <span>@{githubProfile}</span>
            </a>
            <a
              href={`https://github.com/${githubProfile}/${projectRepo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center"
              aria-label="Project Source Code"
            >
              <Code className="mr-2" size={18} />
              <span>Source Code</span>
            </a>
          </div>

          <div className="text-sm text-gray-500 flex items-center justify-center">
            <Copyright className="mr-1" size={14} />
            <span>{currentYear} {projectRepo}. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;