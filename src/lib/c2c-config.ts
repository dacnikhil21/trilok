export type AgreementType = "sale" | "rental" | "service"

export interface AgreementTypeConfig {
  id: AgreementType
  title: string
  description: string
  color: string
  colorLight: string
  buttonClass: string
}

export type TemplateFieldType = "text" | "number" | "select" | "textarea" | "date" | "pills"

export interface TemplateField {
  key: string
  label: string
  type: TemplateFieldType
  placeholder?: string
  required?: boolean
  options?: string[]
}

export interface AgreementCategory {
  id: string
  title: string
  description: string
  introTitle: string
  introItems: string[]
  icon: "mobile" | "vehicle" | "furniture" | "other" | "pg" | "electronics-rental" | "freelance" | "maid" | "repair"
  /** Item/Property Details form for this category — screens 4-7 of the create-agreement wizard. */
  fields?: TemplateField[]
  /** Section title shown above the form fields, e.g. "Item Details", "Vehicle Details". */
  detailsTitle?: string
  detailsSubtitle?: string
}

export const CONDITION_OPTIONS = ["New", "Used - Like New", "Used - Good", "Used - Fair"]

export const AGREEMENT_TYPES: AgreementTypeConfig[] = [
  {
    id: "sale",
    title: "Sale Agreement",
    description: "Buy & sell items",
    color: "#2563EB",
    colorLight: "#EFF6FF",
    buttonClass: "bg-[#2563EB] hover:bg-[#1D4ED8]",
  },
  {
    id: "rental",
    title: "Rental Agreement",
    description: "Rent property or items",
    color: "#10B981",
    colorLight: "#ECFDF5",
    buttonClass: "bg-[#10B981] hover:bg-[#059669]",
  },
  {
    id: "service",
    title: "Service Agreement",
    description: "Services & contracts",
    color: "#9333EA",
    colorLight: "#F5F3FF",
    buttonClass: "bg-[#9333EA] hover:bg-[#7E22CE]",
  },
]

export const SALE_CATEGORIES: AgreementCategory[] = [
  {
    id: "mobile-electronics",
    title: "Mobile Phone & Electronics Sale",
    description: "For selling mobile phones, laptops, tablets, cameras and other electronic items.",
    introTitle: "Create Agreement for Mobile & Electronics Sale",
    introItems: ["Mobile Phones", "Laptops / Desktops", "Tablets", "Smartwatches", "Cameras", "TV & Home Appliances", "Other Electronic Items"],
    icon: "mobile",
    detailsTitle: "Item Details",
    detailsSubtitle: "Enter details about the item",
    fields: [
      {
        key: "itemType",
        label: "Device / Item Category",
        type: "select",
        required: true,
        placeholder: "Select Category (Mobile, Laptop, TV etc.)",
        options: [
          "Mobile Phone / Smartphone",
          "Laptop / Desktop Computer",
          "Tablet / iPad",
          "Smartwatch / Wearable",
          "Camera & Photography Gear",
          "Television & Home Audio",
          "Gaming Console & Accessories",
          "Home Appliance",
          "Other Electronic Device",
        ],
      },
      { key: "productName", label: "Item Name", type: "text", required: true, placeholder: "Example: iPhone 14 Pro" },
      {
        key: "brand",
        label: "Brand",
        type: "select",
        placeholder: "Select Brand",
        options: [
          "Apple",
          "Samsung",
          "OnePlus",
          "Xiaomi / Redmi",
          "Vivo",
          "Oppo",
          "Realme",
          "Google Pixel",
          "Motorola",
          "Dell",
          "HP",
          "Lenovo",
          "Asus",
          "Acer",
          "Sony",
          "LG",
          "Boat",
          "Other Brand",
        ],
      },
      { key: "model", label: "Model", type: "text", placeholder: "Example: 128GB Deep Purple" },
      { key: "condition", label: "Item Condition", type: "select", required: true, placeholder: "Select Condition", options: CONDITION_OPTIONS },
      { key: "serialNumber", label: "IMEI / Serial Number", type: "text", placeholder: "Enter 15-digit IMEI or Serial Number" },
      { key: "saleAmount", label: "Sale Price (₹)", type: "number", required: true, placeholder: "Enter sale price" },
      { key: "description", label: "Description", type: "textarea", placeholder: "Enter condition details, warranty or included accessories..." },
    ],
  },
  {
    id: "bike-car",
    title: "Bike or Car Sale",
    description: "For selling bikes, scooters or cars (used or new).",
    introTitle: "Create Agreement for Bike or Car Sale",
    introItems: ["Bike Sale", "Scooter Sale", "Car Sale", "Used Vehicle Sale", "Commercial Vehicle Sale"],
    icon: "vehicle",
    detailsTitle: "Vehicle Details",
    detailsSubtitle: "Enter details about the vehicle",
    fields: [
      {
        key: "vehicleType",
        label: "Vehicle Type",
        type: "select",
        required: true,
        placeholder: "Select Vehicle Type (Car / Bike / Scooter)",
        options: ["Bike / Motorcycle", "Scooter / Scooty", "Car (Sedan / Hatchback / SUV)", "Commercial Vehicle", "Electric Two-Wheeler (EV)", "Electric Four-Wheeler (EV)"],
      },
      {
        key: "brand",
        label: "Brand / Manufacturer",
        type: "select",
        required: true,
        placeholder: "Select Brand",
        options: [
          "Honda",
          "Hero",
          "Bajaj",
          "TVS",
          "Royal Enfield",
          "Yamaha",
          "Suzuki",
          "KTM",
          "Ola Electric",
          "Ather Energy",
          "Maruti Suzuki",
          "Hyundai",
          "Tata Motors",
          "Mahindra",
          "Kia",
          "Toyota",
          "Volkswagen",
          "Other Brand",
        ],
      },
      { key: "model", label: "Model & Variant", type: "text", required: true, placeholder: "Example: Activa 6G / Swift VXI" },
      { key: "registrationNumber", label: "Registration Number", type: "text", required: true, placeholder: "Example: TS09 AB 1234" },
      {
        key: "modelYear",
        label: "Model Year",
        type: "select",
        placeholder: "Select Year",
        options: ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015 & older"],
      },
      {
        key: "fuelType",
        label: "Fuel Type",
        type: "select",
        placeholder: "Select Fuel Type",
        options: ["Petrol", "Diesel", "Electric (EV)", "CNG / Hybrid"],
      },
      { key: "condition", label: "Vehicle Condition", type: "select", required: true, placeholder: "Select Condition", options: CONDITION_OPTIONS },
      { key: "saleAmount", label: "Sale Price (₹)", type: "number", required: true, placeholder: "Enter sale price" },
      { key: "description", label: "Description", type: "textarea", placeholder: "Enter vehicle condition, insurance validity, RC transfer terms..." },
    ],
  },
  {
    id: "furniture",
    title: "Furniture Sale",
    description: "For selling furniture, home decor and furnishing items.",
    introTitle: "Create Agreement for Furniture Sale",
    introItems: ["Home Furniture", "Office Furniture", "Used Furniture", "Custom Furniture", "Bulk Furniture Sale"],
    icon: "furniture",
    detailsTitle: "Item Details",
    detailsSubtitle: "Enter details about the furniture",
    fields: [
      { key: "productName", label: "Furniture Item Name", type: "text", required: true, placeholder: "Example: 6-Seater Sofa Set / Dining Table" },
      {
        key: "material",
        label: "Material Type",
        type: "select",
        placeholder: "Select Material",
        options: [
          "Solid Wood (Sheesham / Teak / Oak)",
          "Engineered Wood / Plywood",
          "Metal / Wrought Iron",
          "Fabric / Velvet Upholstery",
          "Leather / Leatherette",
          "Glass & Metal",
          "Plastic / Fiber",
          "Other Material",
        ],
      },
      { key: "condition", label: "Condition", type: "select", required: true, placeholder: "Select Condition", options: CONDITION_OPTIONS },
      { key: "saleAmount", label: "Sale Price (₹)", type: "number", required: true, placeholder: "Enter sale price" },
      { key: "description", label: "Description", type: "textarea", placeholder: "Enter dimensions, color, delivery terms or warranty if any..." },
    ],
  },
  {
    id: "others-sale",
    title: "Others Sale",
    description: "For all other items and products.",
    introTitle: "Create Agreement for Other Items Sale",
    introItems: ["General Items", "Personal Property", "Collectibles", "Miscellaneous Products"],
    icon: "other",
    detailsTitle: "Item Details",
    detailsSubtitle: "Enter details about the item",
    fields: [
      { key: "productName", label: "Item Name", type: "text", required: true, placeholder: "Example: Books, Sports Equipments" },
      {
        key: "othersCategory",
        label: "Category",
        type: "select",
        placeholder: "Select Category",
        options: [
          "Books & Study Material",
          "Sports & Fitness Equipment",
          "Kitchen & Dining Items",
          "Musical Instruments",
          "Home Decor & Paintings",
          "Toys & Kids Items",
          "Collectibles & Antiques",
          "Tools & Hardware",
          "Other Products",
        ],
      },
      { key: "condition", label: "Condition", type: "select", required: true, placeholder: "Select Condition", options: CONDITION_OPTIONS },
      { key: "saleAmount", label: "Sale Price (₹)", type: "number", required: true, placeholder: "Enter sale price" },
      { key: "description", label: "Description", type: "textarea", placeholder: "Enter item description and terms..." },
    ],
  },
]

export const RENTAL_CATEGORIES: AgreementCategory[] = [
  {
    id: "pg-rental",
    title: "PG Rental",
    description: "Paying Guest and shared accommodation rental agreements.",
    introTitle: "Create Agreement for PG Rental",
    introItems: ["PG / Hostel Rooms", "Shared Accommodation", "Rent Terms", "Security Deposit"],
    icon: "pg",
    detailsTitle: "PG Details",
    detailsSubtitle: "Enter details about the paying guest accommodation",
    fields: [
      { key: "productName", label: "PG / Property Name", type: "text", required: true, placeholder: "Example: Sai PG Accommodation" },
      {
        key: "propertyType",
        label: "Property Type",
        type: "select",
        required: true,
        placeholder: "Select Property Type",
        options: ["Independent PG", "Shared Apartment / Flat", "Hostel Accommodation", "Service Apartment", "Coliving Space"],
      },
      {
        key: "roomType",
        label: "Room Type",
        type: "select",
        required: true,
        placeholder: "Select Room Sharing Type",
        options: ["Single Sharing (Private Room)", "Double Sharing (2 Beds)", "Triple Sharing (3 Beds)", "Four Sharing", "Dormitory"],
      },
      { key: "address", label: "Complete Property Address", type: "textarea", required: true, placeholder: "Enter complete address with landmark & pincode" },
      { key: "monthlyRent", label: "Rent Amount (₹)", type: "number", required: true, placeholder: "Enter rent amount" },
      {
        key: "rentalDuration",
        label: "Rental Duration",
        type: "select",
        required: true,
        placeholder: "Select Duration (e.g. 1 Month, 11 Months)",
        options: ["1 Day", "3 Days", "1 Week", "15 Days", "1 Month", "3 Months", "6 Months", "11 Months", "1 Year", "Flexible / Custom Stay"],
      },
      { key: "securityDeposit", label: "Security Deposit (₹)", type: "number", placeholder: "Enter security deposit" },
      { key: "amenities", label: "Amenities Included", type: "textarea", placeholder: "WiFi, 3 Times Food, AC, Geyser, Washing Machine, Daily Cleaning" },
      { key: "rulesRegulations", label: "Rules & Notice Period", type: "textarea", placeholder: "Gate closing time: 10:30 PM, 30 days notice period before vacating..." },
    ],
  },
  {
    id: "vehicle-rental",
    title: "Vehicle Rental",
    description: "Rental agreements for cars, bikes, scooters and commercial vehicles.",
    introTitle: "Create Agreement for Vehicle Rental",
    introItems: ["Car Rental", "Bike Rental", "Scooter Rental", "Commercial Vehicle Rental"],
    icon: "vehicle",
    detailsTitle: "Vehicle Details",
    detailsSubtitle: "Enter details about the vehicle to be rented",
    fields: [
      {
        key: "vehicleType",
        label: "Vehicle Type",
        type: "select",
        required: true,
        placeholder: "Select Vehicle Type",
        options: ["Car / Hatchback / Sedan / SUV", "Bike / Motorcycle", "Scooter", "Commercial Van / Tempo", "Luxury / Self-Drive Car"],
      },
      { key: "brand", label: "Brand", type: "text", required: true, placeholder: "Example: Honda / Hyundai" },
      { key: "model", label: "Model", type: "text", required: true, placeholder: "Example: Activa 6G / Creta" },
      { key: "registrationNumber", label: "Registration Number", type: "text", required: true, placeholder: "Example: TS09 AB 1234" },
      {
        key: "fuelType",
        label: "Fuel Type",
        type: "select",
        required: true,
        placeholder: "Select Fuel Type",
        options: ["Petrol", "Diesel", "Electric (EV)", "CNG"],
      },
      { key: "dailyRent", label: "Rent Amount (₹)", type: "number", required: true, placeholder: "Enter rent amount" },
      {
        key: "rentalDuration",
        label: "Rental Duration",
        type: "select",
        required: true,
        placeholder: "Select Duration (e.g. 3 Days, 1 Month)",
        options: ["1 Day", "3 Days", "1 Week", "15 Days", "1 Month", "3 Months", "6 Months", "Custom Duration"],
      },
      { key: "securityDeposit", label: "Security Deposit (₹)", type: "number", placeholder: "Enter security deposit" },
      { key: "extraCharges", label: "Extra KM & Late Charges", type: "text", placeholder: "₹10/km after 150km limit, ₹200/hr late return fee" },
      { key: "condition", label: "Condition of Vehicle", type: "select", required: true, placeholder: "Select Condition", options: CONDITION_OPTIONS },
      { key: "description", label: "Terms & Guidelines", type: "textarea", placeholder: "Driver license copy required, no drunk driving, helmet/seatbelt mandatory..." },
    ],
  },
  {
    id: "electronics-rental",
    title: "Electronics Rental",
    description: "Rental agreements for laptops, cameras, projectors and other electronics.",
    introTitle: "Create Agreement for Electronic Rentals",
    introItems: ["Laptop Rental", "Camera Rental", "Projector Rental", "Other Electronics"],
    icon: "electronics-rental",
    detailsTitle: "Electronics Details",
    detailsSubtitle: "Enter details about the electronics to be rented",
    fields: [
      {
        key: "itemType",
        label: "Item Type",
        type: "select",
        required: true,
        placeholder: "Select Item Type",
        options: ["Laptop / MacBook", "DSLR / Cinema Camera", "Projector & Screen Setup", "Gaming Console & VR", "Sound System / Speaker Setup", "Other Electronics"],
      },
      { key: "brand", label: "Brand", type: "text", required: true, placeholder: "Example: Dell / Apple / Sony" },
      { key: "model", label: "Model & Specs", type: "text", required: true, placeholder: "Example: Dell XPS 15 (16GB RAM, 512GB SSD)" },
      { key: "condition", label: "Item Condition", type: "select", required: true, placeholder: "Select Condition", options: CONDITION_OPTIONS },
      { key: "accessoriesIncluded", label: "Accessories Included", type: "text", placeholder: "Original charger, carry case, HDMI cable..." },
      { key: "dailyRent", label: "Rent Amount (₹)", type: "number", required: true, placeholder: "Enter rent amount" },
      {
        key: "rentalDuration",
        label: "Rental Duration",
        type: "select",
        required: true,
        placeholder: "Select Duration (e.g. 1 Week, 1 Month)",
        options: ["1 Day", "3 Days", "1 Week", "15 Days", "1 Month", "3 Months", "6 Months", "Custom Duration"],
      },
      { key: "securityDeposit", label: "Security Deposit (₹)", type: "number", placeholder: "Enter refundable deposit" },
      { key: "description", label: "Rental Terms", type: "textarea", placeholder: "Any physical damage or loss of accessories will be deducted from deposit..." },
    ],
  },
  {
    id: "other-rental",
    title: "Other Rentals",
    description: "Rental agreements for equipment, tools, events and miscellaneous items.",
    introTitle: "Create Agreement for Other Rentals",
    introItems: ["Equipment Rental", "Tool Rental", "Event Equipment", "Other Rental Services"],
    icon: "other",
    detailsTitle: "Service Details",
    detailsSubtitle: "Enter details about the rental service",
    fields: [
      {
        key: "serviceType",
        label: "Service / Rental Category",
        type: "select",
        required: true,
        placeholder: "Select Category",
        options: ["Event Space / Banquet", "Sound & Lighting Equipment", "Construction Tools & Machinery", "Costumes & Dresses", "Furniture / Decor Setup", "Other Rental"],
      },
      { key: "serviceName", label: "Service / Item Name", type: "text", required: true, placeholder: "Example: Event Hall / High-End Lighting" },
      {
        key: "rentalDuration",
        label: "Rental Duration",
        type: "select",
        required: true,
        placeholder: "Select Duration (e.g. 1 Day, 1 Month)",
        options: ["1 Day", "3 Days", "1 Week", "15 Days", "1 Month", "3 Months", "6 Months", "Custom Duration"],
      },
      { key: "startDate", label: "Start Date", type: "date", required: true },
      { key: "endDate", label: "End Date", type: "date", required: true },
      { key: "totalCharges", label: "Rent Amount (₹)", type: "number", required: true, placeholder: "Enter rent amount" },
      { key: "securityDeposit", label: "Security Deposit (₹)", type: "number", placeholder: "Enter security deposit" },
      { key: "specialInstructions", label: "Special Instructions", type: "textarea", placeholder: "Setup guidelines, delivery terms, cancellation policy..." },
    ],
  },
]

export const SERVICE_CATEGORIES: AgreementCategory[] = [
  {
    id: "freelance",
    title: "Freelance Services",
    description: "Agreement for freelance and project-based work.",
    introTitle: "Create Agreement for Freelance Contracts",
    introItems: ["Project based work", "Content writing", "Design services", "Consulting", "Software development"],
    icon: "freelance",
    detailsTitle: "Service Details",
    detailsSubtitle: "Enter details about the freelance project",
    fields: [
      {
        key: "serviceType",
        label: "Domain / Discipline",
        type: "select",
        required: true,
        placeholder: "Select Domain",
        options: [
          "Software & Web Development",
          "UI/UX Design & Branding",
          "Content Writing & Copywriting",
          "Digital Marketing & SEO",
          "Video Editing & Animation",
          "Business Consulting",
          "Other Freelance Work",
        ],
      },
      { key: "serviceName", label: "Project Title", type: "text", required: true, placeholder: "Example: Ecommerce Web App Development" },
      { key: "startDate", label: "Project Start Date", type: "date", required: true },
      { key: "endDate", label: "Expected Completion Date", type: "date", required: true },
      { key: "totalCharges", label: "Total Project Fee (₹)", type: "number", required: true, placeholder: "Enter agreed project fee" },
      { key: "serviceDescription", label: "Scope of Work & Deliverables", type: "textarea", placeholder: "Enter scope of deliverables, revision rounds, payment milestones..." },
    ],
  },
  {
    id: "maid",
    title: "Maid Agreements",
    description: "Agreement for domestic help and maid services.",
    introTitle: "Create Agreement for Maid Agreements",
    introItems: ["Full time maid", "Part time maid", "Salary & payment terms", "Work responsibilities"],
    icon: "maid",
    detailsTitle: "Service Details",
    detailsSubtitle: "Enter details about domestic help terms",
    fields: [
      {
        key: "serviceType",
        label: "Service Type",
        type: "select",
        required: true,
        placeholder: "Select Service Type",
        options: ["Full Time Maid (Live-in)", "Part Time Maid", "Cook / Chef", "Babysitter / Nanny", "Elderly Care"],
      },
      { key: "serviceName", label: "Worker Name", type: "text", required: true, placeholder: "Example: Sunita Devi" },
      { key: "monthlyRent", label: "Monthly Salary (₹)", type: "number", required: true, placeholder: "Enter monthly salary" },
      { key: "serviceDescription", label: "Work Hours & Responsibilities", type: "textarea", placeholder: "Timings: 8 AM to 5 PM. Tasks: Cooking, Cleaning, Utensils, 2 leaves per month..." },
    ],
  },
  {
    id: "home-repair",
    title: "Home Repair Services",
    description: "Agreement for plumbing, electrical and repair work.",
    introTitle: "Create Agreement for Home Repair Services",
    introItems: ["Plumbing", "Electrical work", "Carpentry", "Appliance repair", "General maintenance"],
    icon: "repair",
    detailsTitle: "Service Details",
    detailsSubtitle: "Enter details about repair and maintenance work",
    fields: [
      {
        key: "serviceType",
        label: "Trade / Service Type",
        type: "select",
        required: true,
        placeholder: "Select Trade",
        options: ["Electrical Wiring & Installation", "Plumbing & Sanitary", "Carpentry & Woodwork", "Painting & Waterproofing", "Appliance Repair", "General Renovation"],
      },
      { key: "serviceName", label: "Job Description", type: "text", required: true, placeholder: "Example: Full House Electrical Wiring" },
      { key: "totalCharges", label: "Agreed Total Cost (₹)", type: "number", required: true, placeholder: "Enter total cost" },
      { key: "serviceDescription", label: "Warranty & Work Terms", type: "textarea", placeholder: "3 months service warranty, materials provided by homeowner..." },
    ],
  },
  {
    id: "others-service",
    title: "Other's",
    description: "Agreement for other service types.",
    introTitle: "Create Agreement for Other Services",
    introItems: ["Coaching / Training", "Legal Services", "Event Services", "Custom Services"],
    icon: "other",
    detailsTitle: "Service Details",
    detailsSubtitle: "Enter details about custom service contract",
    fields: [
      {
        key: "serviceType",
        label: "Service Category",
        type: "select",
        required: true,
        placeholder: "Select Category",
        options: ["Tutor / Coaching Services", "Legal / Documentation Services", "Event Management", "Photography / Videography", "Custom Contract"],
      },
      { key: "serviceName", label: "Service Name", type: "text", required: true, placeholder: "Example: Private Mathematics Coaching" },
      { key: "totalCharges", label: "Total Fee (₹)", type: "number", required: true, placeholder: "Enter total fee" },
      { key: "serviceDescription", label: "Scope & Terms", type: "textarea", placeholder: "Enter agreed schedule, deliverables and terms..." },
    ],
  },
]

export function getCategoriesForType(type: AgreementType): AgreementCategory[] {
  switch (type) {
    case "sale":
      return SALE_CATEGORIES
    case "rental":
      return RENTAL_CATEGORIES
    case "service":
      return SERVICE_CATEGORIES
  }
}

export function getTypeConfig(type: AgreementType): AgreementTypeConfig {
  return AGREEMENT_TYPES.find((t) => t.id === type) ?? AGREEMENT_TYPES[0]
}

export function findCategory(type: AgreementType, categoryId: string): AgreementCategory | undefined {
  return getCategoriesForType(type).find((c) => c.id === categoryId)
}

export const C2C_VERIFICATION_SERVICES = [
  { label: "Aadhaar Verification", shortLabel: "Aadhaar", description: "Verify Aadhaar", color: "#3B82F6", icon: "aadhaar" as const },
  { label: "PAN Verification", shortLabel: "PAN", description: "Verify PAN", color: "#10B981", icon: "pan" as const },
  { label: "GSTIN Verification", shortLabel: "GSTIN", description: "Verify GSTIN", color: "#9333EA", icon: "gstin" as const },
  { label: "Driving Licence Verification", shortLabel: "Driving Licence", description: "Verify DL", color: "#2563EB", icon: "driving-licence" as const },
  { label: "Udyam Verification", shortLabel: "Udyam", description: "Verify Udyam", color: "#F97316", icon: "udyam" as const },
  { label: "RC Verification", shortLabel: "RC", description: "Verify RC", color: "#14B8A6", icon: "rc" as const },
]

export function getTypeTitle(type: AgreementType): string {
  return `${type.charAt(0).toUpperCase()}${type.slice(1)} Agreement`
}
