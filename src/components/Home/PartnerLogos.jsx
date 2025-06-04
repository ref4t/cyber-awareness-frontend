// import React from "react";
// import Slider from "react-slick";

// export const PartnerLogos = () => {
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2500,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: { slidesToShow: 3 },
//       },
//       {
//         breakpoint: 768,
//         settings: { slidesToShow: 2 },
//       },
//       {
//         breakpoint: 480,
//         settings: { slidesToShow: 1 },
//       },
//     ],
//   };

//   return (
//     <section className="py-20 px-6 bg-emerald-50">
//       <h2 className="text-3xl font-bold text-center text-emerald-700 mb-10">
//         Our Partners
//       </h2>
//       <div className="max-w-6xl mx-auto">
//         <Slider {...settings}>
//           {[1, 2, 3, 4, 1, 2].map((id, idx) => (
//             <div key={idx} className="px-4">
//               <img
//                 src={`/images/partner-${id}.png`}
//                 alt={`Partner ${id}`}
//                 className="h-12 mx-auto grayscale hover:grayscale-0 transition duration-300 ease-in-out"
//               />
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </section>
//   );
// };

//With CDN
import React from "react";
import Slider from "react-slick";

export const PartnerLogos = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const logos = [
    {
      name: "Microsoft",
      url: "https://uhf.microsoft.com/images/microsoft/RE1Mu3b.png",
    },
    {
      name: "IBM",
      url: "https://cdn.worldvectorlogo.com/logos/ibm.svg",
    },
    {
      name: "Amazon Web Services",
      url: "https://cdn.worldvectorlogo.com/logos/aws-2.svg",
    },
    {
      name: "Google",
      url: "https://www.gstatic.com/marketing-cms/assets/images/c5/3a/200414104c669203c62270f7884f/google-wordmarks-2x.webp",
    },
    {
      name: "Kaspersky",
      url: "https://cdn.worldvectorlogo.com/logos/kaspersky-lab-1.svg",
    },
    {
      name: "McAfee",
      url: "https://media.mcafeeassets.com/content/dam/npcld/ecommerce/en/company-logo/McAfeeHzRed.svg",
    },
  ];

  return (
    <section className="py-20 px-6 bg-emerald-50">
      <h2 className="text-3xl font-bold text-center text-emerald-700 mb-10">
        Our Partners
      </h2>
      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {logos.map((partner, idx) => (
            <div key={idx} className="px-4 flex justify-center items-center">
              <img
                src={partner.url}
                alt={partner.name}
                className="h-12 object-contain grayscale hover:grayscale-0 transition duration-300 ease-in-out"
                loading="lazy"
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};


