
import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">Visit Us</h2>
          <p className="text-slate-600">Have questions? We are here to help you get started.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex gap-6 p-8 bg-slate-50 rounded-2xl border border-slate-100 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-rose-600 text-white rounded-xl flex items-center justify-center shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">Our Location</h4>
                <p className="text-slate-500 text-sm">123 Fitness Street, East Legon, Accra, Ghana</p>
              </div>
            </div>

            <div className="flex gap-6 p-8 bg-slate-50 rounded-2xl border border-slate-100 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-rose-600 text-white rounded-xl flex items-center justify-center shrink-0">
                <Phone size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-slate-900 text-lg mb-3">Contact Lines</h4>
                <div className="space-y-2 text-slate-700">
                  <p className="text-sm">
                    <a href="tel:+233551336976" className="text-rose-600 hover:text-rose-700">0551336976</a>
                  </p>
                  <p className="text-sm">
                    <a href="tel:+233246458898" className="text-rose-600 hover:text-rose-700">0246458898</a>
                  </p>
                  <p className="text-sm">
                    <a href="tel:+233243505882" className="text-rose-600 hover:text-rose-700">0243505882</a>
                  </p>
                  <p className="text-sm">
                    <a href="tel:+233556620810" className="text-rose-600 hover:text-rose-700">0556620810</a>
                  </p>
                  <p className="text-sm">
                    <a href="tel:+16477451003" className="text-rose-600 hover:text-rose-700">+1 647 745 1003</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-6 p-8 bg-slate-50 rounded-2xl border border-slate-100 transition-transform hover:-translate-y-1">
              <div className="w-12 h-12 bg-rose-600 text-white rounded-xl flex items-center justify-center shrink-0">
                <Mail size={24} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-lg mb-1">Email Address</h4>
                <p className="text-slate-500 text-sm">hello@goodlifefitness.com</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-3xl p-10 text-white relative overflow-hidden">
            <h3 className="text-2xl font-bold mb-6">Operating Hours</h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Monday - Friday</span>
                <span className="text-rose-400 font-bold">5:00 AM - 10:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Saturday</span>
                <span className="text-rose-400 font-bold">7:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span>Sunday</span>
                <span className="text-rose-400 font-bold">8:00 AM - 6:00 PM</span>
              </div>
              <div className="flex justify-between pb-2">
                <span>Public Holidays</span>
                <span className="text-rose-400 font-bold">8:00 AM - 4:00 PM</span>
              </div>
            </div>
            
            <div className="mt-10 p-6 bg-slate-800 rounded-2xl flex items-center gap-4">
              <Clock className="text-rose-500" />
              <p className="text-sm">We are open 363 days a year. Only closed on Christmas Day and Good Friday.</p>
            </div>
            
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-rose-600/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
