"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Phone, Clock, ArrowLeft } from "lucide-react";

export default function Locations() {
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);

  const locations = [
    {
      id: 1,
      name: "Downtown Hub",
      address: "123 Coffee Street, Seattle, WA 98101",
      phone: "(206) 555-0101",
      hours: "6:00 AM - 9:00 PM",
      description:
        "Our flagship location in the heart of downtown Seattle. Modern ambiance with high ceilings and natural light, perfect for both work and relaxation.",
      image:
        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=600&h=400&fit=crop",
      features: [
        "WiFi",
        "Seating for 40+",
        "Parking Available",
        "Outdoor Patio",
      ],
    },
    {
      id: 2,
      name: "Waterfront Retreat",
      address: "456 Harbor View Lane, Seattle, WA 98121",
      phone: "(206) 555-0202",
      hours: "7:00 AM - 8:00 PM",
      description:
        "Escape to our waterfront location with stunning views of Puget Sound. A serene space where you can watch the water while sipping your perfect brew.",
      image:
        "https://images.unsplash.com/photo-1493857671505-72967e2e2760?w=600&h=400&fit=crop",
      features: ["Water Views", "Takeout Only", "Boat Parking", "Pet Friendly"],
    },
    {
      id: 3,
      name: "Cozy Corner",
      address: "789 Elm Avenue, Seattle, WA 98103",
      phone: "(206) 555-0303",
      hours: "8:00 AM - 7:00 PM",
      description:
        "A intimate neighborhood café perfect for quiet moments and meaningful conversations. Warm, intimate lighting and vintage furnishings create a home-like atmosphere.",
      image:
        "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&h=400&fit=crop",
      features: [
        "Cozy Seating",
        "Board Games",
        "Books Library",
        "Book Readings",
      ],
    },
    {
      id: 4,
      name: "Urban Station",
      address: "321 Central Plaza, Seattle, WA 98104",
      phone: "(206) 555-0404",
      hours: "5:30 AM - 10:00 PM",
      description:
        "Located in the bustling business district, our fastest-serve location with quick counter service, perfect for your morning commute or lunch break.",
      image:
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&h=400&fit=crop",
      features: [
        "Quick Service",
        "Counter Seating",
        "To-Go Cups",
        "Multiple Tills",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-900 via-amber-800 to-amber-900">
      {/* Header */}
      <div className="pt-32 pb-16 px-4 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-6 text-amber-100 hover:text-white transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 font-sans">
          Visit Our Locations
        </h1>
        <p className="text-xl text-amber-100 max-w-2xl mx-auto">
          Discover the perfect Aura Cafe near you. Each location offers a unique
          experience while maintaining our commitment to quality and calm.
        </p>
      </div>

      {/* Locations Grid */}
      <div className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-8">
          {locations.map((location) => (
            <div
              key={location.id}
              className="group cursor-pointer"
              onClick={() =>
                setSelectedLocation(
                  selectedLocation === location.id ? null : location.id,
                )
              }
            >
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transition-all duration-300 hover:shadow-3xl">
                {/* Image */}
                <img
                  src={location.image}
                  alt={location.name}
                  className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all duration-300" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <h2 className="text-3xl font-bold text-white mb-2 font-sans">
                    {location.name}
                  </h2>
                  <div className="flex items-center gap-2 text-amber-100 mb-4">
                    <MapPin className="h-5 w-5" />
                    <p className="text-sm">{location.address}</p>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedLocation === location.id && (
                <div className="mt-4 p-6 bg-white/10 backdrop-blur rounded-2xl border border-white/20 animate-in fade-in duration-300">
                  <p className="text-amber-50 mb-6 leading-relaxed">
                    {location.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-amber-200">Phone</p>
                        <p className="text-white font-semibold">
                          {location.phone}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-amber-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm text-amber-200">Hours</p>
                        <p className="text-white font-semibold">
                          {location.hours}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-amber-200 mb-3">Features</p>
                    <div className="flex flex-wrap gap-2">
                      {location.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-4 py-2 bg-amber-500/30 text-amber-50 rounded-full text-sm font-medium border border-amber-400/50"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button className="mt-6 w-full px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors">
                    Get Directions
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="flex flex-col items-center justify-center py-8 bg-black text-white text-center mt-20">
        <p className="text-amber-400 font-bold">Aura Cafe © 2026</p>
        <p className="text-sm font-bold text-gray-300">
          Made by{" "}
          <a
            href="https://github.com/dgk1503"
            className="outline-none text-sm text-gray-300 font-serif"
            target="_blank"
          >
            DGK
          </a>{" "}
        </p>
      </footer>
    </div>
  );
}
