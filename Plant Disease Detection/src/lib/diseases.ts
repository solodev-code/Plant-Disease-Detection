// Static reference library of common plant diseases
// Used for the disease library tab and as educational content

export interface DiseaseInfo {
  id: string
  name: string
  scientificName: string
  category: "Fungal" | "Bacterial" | "Viral" | "Pest" | "Nutrient" | "Environmental"
  affectedPlants: string[]
  severity: "Low" | "Moderate" | "Severe"
  symptoms: string[]
  causes: string[]
  treatment: string[]
  prevention: string[]
  description: string
}

export const diseaseLibrary: DiseaseInfo[] = [
  {
    id: "early-blight",
    name: "Early Blight",
    scientificName: "Alternaria solani",
    category: "Fungal",
    affectedPlants: ["Tomato", "Potato", "Eggplant", "Pepper"],
    severity: "Moderate",
    symptoms: [
      "Dark brown to black spots with concentric rings (target-like) on lower leaves",
      "Yellowing and chlorosis around the infected spots",
      "Leaves may drop prematurely",
      "Lesions on stems and fruit",
    ],
    causes: [
      "Fungal pathogen Alternaria solani",
      "High humidity and warm temperatures (24-29°C)",
      "Overhead watering that keeps leaves wet",
      "Poor air circulation around plants",
    ],
    treatment: [
      "Remove and destroy infected leaves immediately",
      "Apply copper-based or chlorothalonil fungicides every 7-10 days",
      "Improve air circulation by pruning and spacing",
      "Mulch around plants to prevent soil splash",
    ],
    prevention: [
      "Rotate crops every 2-3 years (avoid solanaceous crops)",
      "Water at the soil level, keep foliage dry",
      "Space plants adequately for airflow",
      "Use disease-resistant varieties",
    ],
    description:
      "Early blight is a common fungal disease that affects solanaceous crops, especially tomatoes and potatoes. It is characterized by distinctive target-like lesions on the leaves and can significantly reduce yield if left untreated.",
  },
  {
    id: "late-blight",
    name: "Late Blight",
    scientificName: "Phytophthora infestans",
    category: "Fungal",
    affectedPlants: ["Tomato", "Potato"],
    severity: "Severe",
    symptoms: [
      "Large, dark, water-soaked lesions on leaves",
      "White fuzzy growth on leaf undersides in humid conditions",
      "Brown to black lesions on stems",
      "Greasy, brown spots on fruit or tubers",
    ],
    causes: [
      "Oomycete pathogen Phytophthora infestans",
      "Cool, wet weather (15-22°C) with high humidity",
      "Spreads rapidly in windy, rainy conditions",
      "Infected plant debris and volunteer plants",
    ],
    treatment: [
      "Remove and destroy all infected plant parts",
      "Apply protective fungicides (mancozeb, chlorothalonil) preventatively",
      "For advanced infections, use systemic fungicides",
      "Destroy heavily infected plants entirely",
    ],
    prevention: [
      "Plant certified disease-free seed/tubers",
      "Space plants to ensure good air drainage",
      "Avoid overhead irrigation",
      "Remove volunteer plants and cull piles",
    ],
    description:
      "Late blight is one of the most devastating plant diseases, infamous for causing the Irish Potato Famine. It spreads rapidly under cool, wet conditions and can destroy entire crops within days.",
  },
  {
    id: "powdery-mildew",
    name: "Powdery Mildew",
    scientificName: "Erysiphe cichoracearum / Podosphaera spp.",
    category: "Fungal",
    affectedPlants: ["Cucumber", "Squash", "Grape", "Rose", "Many others"],
    severity: "Low",
    symptoms: [
      "White to gray powdery fungal growth on leaf surfaces",
      "Yellowing and distortion of infected leaves",
      "Leaves may become brittle and curl",
      "Stunted growth and reduced yields",
    ],
    causes: [
      "Various fungal species in the Erysiphales order",
      "High humidity with moderate temperatures (15-27°C)",
      "Poor air circulation and crowded plantings",
      "Shady locations with dew formation",
    ],
    treatment: [
      "Apply sulfur-based or potassium bicarbonate fungicides",
      "Use neem oil as an organic option",
      "Prune infected areas to improve airflow",
      "Milk spray (1:9 ratio with water) can suppress mild growth",
    ],
    prevention: [
      "Space plants for adequate airflow",
      "Plant in full sun locations",
      "Avoid overhead watering in evening",
      "Choose resistant varieties when available",
    ],
    description:
      "Powdery mildew is a widespread fungal disease affecting many plant species. Unlike most fungi, it thrives in warm, dry conditions with high humidity and is easily recognized by its distinctive white powdery coating.",
  },
  {
    id: "leaf-curl",
    name: "Tomato Leaf Curl",
    scientificName: "Tomato leaf curl virus (ToLCV)",
    category: "Viral",
    affectedPlants: ["Tomato", "Pepper"],
    severity: "Severe",
    symptoms: [
      "Upward curling and twisting of leaves",
      "Yellowing of leaf margins",
      "Stunted plant growth",
      "Reduced fruit production",
    ],
    causes: [
      "Tomato leaf curl virus (geminivirus)",
      "Transmitted by whiteflies (Bemisia tabaci)",
      "Whitefly populations in warm climates",
      "Infected transplants or weed reservoirs",
    ],
    treatment: [
      "No cure for viral infections - remove infected plants",
      "Control whitefly populations with insecticidal soap",
      "Apply yellow sticky traps to monitor whiteflies",
      "Use reflective mulches to deter whiteflies",
    ],
    prevention: [
      "Use virus-free certified transplants",
      "Control whitefly populations aggressively",
      "Remove weed hosts around the garden",
      "Use row covers to exclude whiteflies early in season",
    ],
    description:
      "Tomato leaf curl is a viral disease transmitted by whiteflies that can cause significant crop losses, especially in tropical and subtropical regions. There is no cure once a plant is infected, so prevention through vector control is critical.",
  },
  {
    id: "bacterial-spot",
    name: "Bacterial Spot",
    scientificName: "Xanthomonas spp.",
    category: "Bacterial",
    affectedPlants: ["Tomato", "Pepper", "Chili"],
    severity: "Moderate",
    symptoms: [
      "Small, water-soaked spots on leaves that turn brown",
      "Spots often have yellow halos",
      "Lesions may coalesce causing leaf blighting",
      "Raised, scab-like spots on fruit",
    ],
    causes: [
      "Xanthomonas bacteria species",
      "Splashing rain or irrigation water",
      "Contaminated seeds and transplants",
      "Warm, wet weather conditions",
    ],
    treatment: [
      "Apply copper-based bactericides (limited efficacy)",
      "Remove infected plant debris",
      "Avoid working with plants when wet",
      "Sanitize tools and stakes regularly",
    ],
    prevention: [
      "Use disease-free certified seed",
      "Hot water treat seeds (122°F for 25 min)",
      "Rotate crops to non-hosts for 2+ years",
      "Avoid overhead irrigation",
    ],
    description:
      "Bacterial spot is a destructive disease of tomatoes and peppers caused by Xanthomonas bacteria. It thrives in warm, wet conditions and can significantly reduce both yield and fruit quality.",
  },
  {
    id: "rust",
    name: "Plant Rust",
    scientificName: "Various Puccinia spp.",
    category: "Fungal",
    affectedPlants: ["Bean", "Rose", "Wheat", "Corn", "Many ornamentals"],
    severity: "Moderate",
    symptoms: [
      "Rust-colored, orange to reddish-brown pustules on leaves",
      "Yellow spots on upper leaf surface",
      "Powdery spore masses that rub off",
      "Premature leaf drop in severe cases",
    ],
    causes: [
      "Rust fungi (Puccinia, Uromyces, and other genera)",
      "Moisture on leaves for extended periods",
      "Moderate temperatures (15-25°C)",
      "Alternate host plants in some species",
    ],
    treatment: [
      "Remove and destroy infected leaves",
      "Apply sulfur or myclobutanil fungicides",
      "Prune to improve air circulation",
      "Disinfect pruners between cuts",
    ],
    prevention: [
      "Plant resistant varieties",
      "Provide good air circulation",
      "Water at soil level, avoid wetting foliage",
      "Remove alternate hosts if applicable",
    ],
    description:
      "Rust diseases are caused by a large group of fungi that produce characteristic rust-colored spores. They are highly specialized, often affecting specific plant species and requiring moisture for infection.",
  },
  {
    id: "mosaic-virus",
    name: "Mosaic Virus",
    scientificName: "TMV / CMV / others",
    category: "Viral",
    affectedPlants: ["Tomato", "Tobacco", "Cucumber", "Pepper", "Many ornamentals"],
    severity: "Severe",
    symptoms: [
      "Mottled light and dark green pattern on leaves",
      "Distorted, wrinkled or puckered leaves",
      "Stunted plant growth",
      "Reduced fruit size and quality",
    ],
    causes: [
      "Various mosaic viruses (TMV, CMV, etc.)",
      "Transmitted by aphids or mechanically",
      "Infected seeds in some cases",
      "Contaminated tools and hands",
    ],
    treatment: [
      "No cure - remove and destroy infected plants",
      "Control aphid vectors with appropriate measures",
      "Disinfect tools with 10% bleach solution",
      "Wash hands with milk and water before handling plants",
    ],
    prevention: [
      "Use virus-resistant varieties",
      "Control aphid populations",
      "Do not smoke around plants (TMV in tobacco)",
      "Buy certified disease-free seed",
    ],
    description:
      "Mosaic viruses are a group of viral diseases that cause distinctive mottled patterns on leaves. They are easily spread by mechanical contact and insect vectors, making them particularly troublesome in greenhouses and gardens.",
  },
  {
    id: "leaf-spot",
    name: "Leaf Spot Disease",
    scientificName: "Septoria spp. / Cercospora spp.",
    category: "Fungal",
    affectedPlants: ["Tomato", "Strawberry", "Mint", "Many ornamentals"],
    severity: "Low",
    symptoms: [
      "Small circular spots with dark borders",
      "Center of spots may turn gray or white",
      "Multiple spots can merge, killing large leaf areas",
      "Leaves may yellow and drop",
    ],
    causes: [
      "Various fungal pathogens (Septoria, Cercospora)",
      "Splashing water spreading spores",
      "Prolonged leaf wetness",
      "Dense plantings reducing airflow",
    ],
    treatment: [
      "Remove infected leaves and plant debris",
      "Apply copper or chlorothalonil fungicides",
      "Improve spacing and air circulation",
      "Mulch to prevent soil splash",
    ],
    prevention: [
      "Rotate crops annually",
      "Avoid overhead watering",
      "Space plants properly",
      "Clean up garden debris in fall",
    ],
    description:
      "Leaf spot diseases are among the most common plant diseases, caused by various fungi that produce characteristic spotted lesions on leaves. While rarely fatal alone, they can defoliate plants and reduce vigor.",
  },
  {
    id: "nitrogen-deficiency",
    name: "Nitrogen Deficiency",
    scientificName: "Nutritional disorder",
    category: "Nutrient",
    affectedPlants: ["All plants"],
    severity: "Low",
    symptoms: [
      "General yellowing (chlorosis) of older leaves",
      "Stunted, slow growth",
      "Smaller than normal leaves",
      "Poor fruit and flower development",
    ],
    causes: [
      "Insufficient nitrogen in soil",
      "Poor soil fertility",
      "Excessive leaching from heavy rain",
      "Improper pH preventing nutrient uptake",
    ],
    treatment: [
      "Apply balanced nitrogen fertilizer",
      "Add compost or well-rotted manure",
      "Use organic options like blood meal or fish emulsion",
      "Side-dress with nitrogen during growth",
    ],
    prevention: [
      "Test soil before planting",
      "Maintain regular fertilization schedule",
      "Add organic matter annually",
      "Use cover crops to build soil nitrogen",
    ],
    description:
      "Nitrogen deficiency is a common nutritional disorder affecting virtually all plants. Nitrogen is essential for chlorophyll production and vegetative growth, and its deficiency shows up as characteristic yellowing of older leaves.",
  },
  {
    id: "aphid-infestation",
    name: "Aphid Infestation",
    scientificName: "Various Aphididae",
    category: "Pest",
    affectedPlants: ["Most plants"],
    severity: "Low",
    symptoms: [
      "Clusters of small soft-bodied insects on new growth",
      "Sticky honeydew on leaves below colonies",
      "Curled, distorted, or yellowed leaves",
      "Sooty mold growing on honeydew",
    ],
    causes: [
      "Aphid insect infestation",
      "Ants farming aphids for honeydew",
      "Lack of natural predators",
      "Excessive nitrogen fertilization",
    ],
    treatment: [
      "Spray with strong water stream to dislodge",
      "Apply insecticidal soap or neem oil",
      "Release ladybugs or lacewings as biological control",
      "Prune heavily infested plant parts",
    ],
    prevention: [
      "Encourage beneficial insects",
      "Avoid over-fertilizing with nitrogen",
      "Use reflective mulches to deter aphids",
      "Inspect plants regularly for early detection",
    ],
    description:
      "Aphids are small sap-sucking insects that can quickly multiply and weaken plants. They reproduce rapidly and can transmit plant viruses, making them a serious pest in gardens and agriculture.",
  },
  {
    id: "root-rot",
    name: "Root Rot",
    scientificName: "Pythium / Phytophthora / Fusarium",
    category: "Fungal",
    affectedPlants: ["Most plants, especially in containers"],
    severity: "Severe",
    symptoms: [
      "Yellowing and wilting of leaves despite moist soil",
      "Soft, brown or black roots instead of firm white roots",
      "Stunted growth and general decline",
      "Plants may collapse suddenly",
    ],
    causes: [
      "Various fungal pathogens",
      "Overwatering and waterlogged soil",
      "Poor drainage in pots or soil",
      "Contaminated potting mix or tools",
    ],
    treatment: [
      "Reduce watering frequency immediately",
      "Repot in fresh, well-draining soil",
      "Trim away rotted roots with sterilized tools",
      "Apply biological fungicides (Trichoderma)",
    ],
    prevention: [
      "Use well-draining soil mixes",
      "Ensure pots have drainage holes",
      "Water only when top inch of soil is dry",
      "Sterilize tools and pots between uses",
    ],
    description:
      "Root rot is a destructive disease caused by various fungal pathogens that thrive in waterlogged, poorly drained soil. It is often fatal by the time symptoms appear above ground, making prevention through proper watering critical.",
  },
  {
    id: "healthy",
    name: "Healthy Plant",
    scientificName: "No disease detected",
    category: "Environmental",
    affectedPlants: ["All plants"],
    severity: "Low",
    symptoms: ["Vibrant green foliage", "Sturdy stems and upright growth", "No visible lesions or discoloration"],
    causes: ["Proper care and growing conditions"],
    treatment: ["Continue current care regimen", "Monitor regularly for early signs of stress"],
    prevention: [
      "Maintain consistent watering schedule",
      "Provide appropriate light conditions",
      "Fertilize appropriately for plant type",
      "Inspect regularly for early problem detection",
    ],
    description:
      "A healthy plant shows vigorous growth, vibrant coloration, and shows no signs of disease or pest pressure. Continue proper care to maintain plant health and prevent future problems.",
  },
]

export const diseaseCategories = [
  "All",
  "Fungal",
  "Bacterial",
  "Viral",
  "Pest",
  "Nutrient",
  "Environmental",
] as const
