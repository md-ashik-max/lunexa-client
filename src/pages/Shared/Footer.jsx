import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    
                    {/* About Section */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">About Lunexa</h2>
                        <p>
                            Lunexa Job is your go-to platform for finding the perfect product that fits your needs. Whether you're looking for the latest tech gadgets or everyday essentials, our advanced search, categorization, and sorting features make it easy to find exactly what you're looking for.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Quick Links</h2>
                        <ul className="space-y-2">
                            <li><a href="/about" className="hover:underline">About Us</a></li>
                            <li><a href="/contact" className="hover:underline">Contact Us</a></li>
                            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
                            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Connect With Us */}
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Connect With Us</h2>
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500"><FaFacebook size={28} /></a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400"><FaTwitter size={28} /></a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600"><FaLinkedin size={28} /></a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500"><FaGithub size={28} /></a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 border-t border-gray-700 pt-6 text-center">
                    <p>&copy; {new Date().getFullYear()} Lunexa Job. All rights reserved.</p>
                    <p>Designed and Developed by [Ashikur Rahman]</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
