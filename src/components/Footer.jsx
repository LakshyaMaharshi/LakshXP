import React from 'react';
import { Rocket, Github, Star, Code, Copyright } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">


          <div className="mb-6 p-4 bg-white rounded-lg shadow-sm inline-flex items-center">
            <Rocket className="text-purple-600 mr-2" size={20} />
            <p className="text-gray-700 font-medium">
              Enjoying the app? Give a{' '}
              <a
                href="https://github.com/LakshXP/your-repo-name"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors inline-flex items-center"
              >
                <Star className="mx-1" size={16} fill="currentColor" />
                to the repo on GitHub
              </a>
            </p>
          </div>

  
          <div className="flex justify-center space-x-6 mb-6">
            <a
              href="https://github.com/LakshXP"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center"
              aria-label="GitHub Profile"
            >
              <Github className="mr-2" size={18} />
              <span>@LakshyaMaharshi</span>
            </a>
            <a
              href="https://github.com/LakshXP/your-repo-name"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors flex items-center"
              aria-label="Repository"
            >
              <Code className="mr-2" size={18} />
              <span>Project Repository</span>
            </a>
          </div>

     
          <div className="text-sm text-gray-500 flex items-center justify-center">
            <Copyright className="mr-1" size={14} />
            <span>{new Date().getFullYear()} LakshXP. All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;