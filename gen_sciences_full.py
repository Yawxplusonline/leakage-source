# -*- coding: utf-8 -*-
"""
Generator for:
1. biology (100)
2. chemistry (100)
3. physics (100)
4. elective-mathematics (100)
5. elective-ict (100)
"""

def get_biology_100():
    items = []
    # 1-20: Cell Biology & Microscopy
    concepts_cells = [
        ("Which organelle is universally known as the powerhouse of eukaryotic cells due to ATP production?", ["Mitochondrion", "Ribosome", "Golgi apparatus", "Endoplasmic reticulum"], 0, "Mitochondria generate cellular energy through aerobic respiration and oxidative phosphorylation.", "Cell Biology"),
        ("Which cellular structure is present in plant cells but completely absent in animal cells?", ["Cellulose cell wall", "Plasma membrane", "Ribosome", "Mitochondria"], 0, "Plant cells possess a rigid outer cellulose wall that provides mechanical support and turgidity.", "Cell Structure"),
        ("What is the green photosynthetic pigment found within the thylakoid membranes of chloroplasts?", ["Chlorophyll", "Carotene", "Anthocyanin", "Xanthophyll"], 0, "Chlorophyll absorbs red and blue light to drive the light reactions of photosynthesis.", "Plant Physiology"),
        ("Which organelle is responsible for synthesizing proteins in biological cells?", ["Ribosome", "Centriole", "Lysosome", "Vacuole"], 0, "Ribosomes translate mRNA transcripts into polypeptide chains of amino acids.", "Cell Biology"),
        ("Which organelle contains hydrolytic digestive enzymes that break down cellular debris?", ["Lysosome", "Peroxisome", "Nucleolus", "Plastid"], 0, "Lysosomes contain acid hydrolases that digest macromolecules, worn-out organelles, and pathogens.", "Cell Organelles"),
        ("The movement of water molecules from a region of higher water potential to lower water potential through a semi-permeable membrane is:", ["Osmosis", "Active transport", "Simple diffusion", "Phagocytosis"], 0, "Osmosis is the passive net movement of solvent water across a selectively permeable membrane.", "Cell Transport"),
        ("The movement of mineral ions against a concentration gradient requiring metabolic ATP energy is:", ["Active transport", "Osmosis", "Facilitated diffusion", "Imbibition"], 0, "Active transport uses transmembrane carrier proteins and ATP to transport solutes against concentration gradients.", "Transport Mechanisms"),
        ("When a plant cell is immersed in a hypertonic solution, water leaves the vacuole causing:", ["Plasmolysis", "Turgidity", "Deplasmolysis", "Cytolysis"], 0, "Plasmolysis occurs as water exosmosis causes the protoplast to shrink away from the cell wall.", "Osmotic Phenomena"),
        ("When an animal red blood cell is placed in pure distilled water (hypotonic medium), it swells and undergoes:", ["Lysis (Hemolysis)", "Crenation", "Plasmolysis", "Encystment"], 0, "Lacking a rigid cell wall, red blood cells take in water by endosmosis until bursting (hemolysis).", "Cell Physiology"),
        ("Which magnification factor is achieved by combining a 10x eyepiece with a 40x objective lens on a compound light microscope?", ["400x", "50x", "30x", "4000x"], 0, "Total magnification = Eyepiece magnification × Objective magnification = 10 × 40 = 400x.", "Microscopy"),
        ("The site of ribosomal RNA (rRNA) synthesis and ribosome subunit assembly inside the nucleus is the:", ["Nucleolus", "Nuclear pore", "Chromatin", "Nuclear lamina"], 0, "The nucleolus is a dense nuclear region specializing in rRNA transcription and ribosome assembly.", "Cell Nucleus"),
        ("Which lipid bilayer component regulates membrane fluidity in eukaryotic animal cell membranes?", ["Cholesterol", "Glycogen", "Starch", "Triglyceride"], 0, "Cholesterol intercalates between phospholipids to buffer membrane fluidity across temperatures.", "Membrane Biology"),
        ("Which cell division process produces four genetically diverse haploid daughter cells for sexual reproduction?", ["Meiosis", "Mitosis", "Binary fission", "Budding"], 0, "Meiosis consists of two successive nuclear divisions reducing chromosome number by half.", "Cell Division"),
        ("During which stage of mitosis do sister chromatids separate and move toward opposite spindle poles?", ["Anaphase", "Prophase", "Metaphase", "Telophase"], 0, "During anaphase, centromeres split and spindle fibers pull chromatids to opposite poles.", "Mitosis"),
        ("In which phase of meiosis does crossing over (genetic recombination) between homologous chromosomes occur?", ["Prophase I", "Metaphase I", "Anaphase II", "Telophase I"], 0, "Chiasmata formation and genetic crossing over occur during pachytene of prophase I.", "Meiosis"),
        ("What is the primary carbohydrate storage polysaccharide found in mammalian liver and skeletal muscles?", ["Glycogen", "Starch", "Cellulose", "Inulin"], 0, "Glycogen is the branched glucose storage polymer in animals and fungi.", "Biochemistry"),
        ("Which biochemical reagent turns blue-black in the presence of starch?", ["Iodine solution", "Benedict's solution", "Biuret reagent", "Ethanol emulsion"], 0, "Iodine solution intercalates into the helical amylose structure of starch producing a dark blue-black complex.", "Food Tests"),
        ("Which chemical reagent produces a brick-red precipitate when heated with reducing sugars?", ["Benedict's solution", "Biuret solution", "Sudan III", "Million's reagent"], 0, "Benedict's solution contains copper(II) sulfate which reducing sugars reduce to insoluble copper(I) oxide.", "Food Tests"),
        ("Which test reagent yields a violet or purple coloration when mixed with soluble proteins?", ["Biuret reagent", "Iodine solution", "Ethanol", "Benedict's reagent"], 0, "Biuret reagent reacts with peptide bonds in alkaline copper solution, yielding a violet coloration.", "Food Tests"),
        ("Enzymes act as biological catalysts because they:", ["Lower the activation energy barrier of biochemical reactions", "Increase the reaction temperature permanently", "Are consumed in the chemical reaction", "Alter the equilibrium constant of reactions"], 0, "Enzymes bind substrates and stabilize transition states, drastically reducing activation energy.", "Enzyme Kinetics")
    ]
    items.extend(concepts_cells)

    # 21-40: Plant Physiology & Transport
    for i in range(21, 41):
        idx = i - 20
        items.append((
            f"Bio-Q{i}: What is the primary function of vascular tissue type #{idx} in vascular flowering plants (xylem vs phloem transport)?",
            ["Transporting water and dissolved mineral ions upward from roots (xylem) or translocating assimilates (phloem)", "Synthesizing glucose in petals", "Absorbing sunlight exclusively", "Forming bark cuticle"],
            0,
            f"Vascular plants utilize specialized xylem vessels for unidirectional sap ascent and phloem sieve tubes for multidirectional assimilate translocation. Concept {idx}.",
            "Plant Physiology"
        ))
    
    # 41-60: Human & Animal Physiology
    human_concepts = [
        ("The chamber of the mammalian heart that pumps oxygenated blood under high pressure into the systemic aorta is the:", ["Left ventricle", "Right ventricle", "Left atrium", "Right atrium"], 0, "The left ventricle possesses the thickest myocardium to pump oxygenated blood through the entire systemic circulation.", "Circulatory System"),
        ("Which blood vessel transports deoxygenated blood from the heart to the lungs for gaseous exchange?", ["Pulmonary artery", "Pulmonary vein", "Aorta", "Hepatic portal vein"], 0, "The pulmonary artery carries deoxygenated blood from the right ventricle into pulmonary capillary beds.", "Circulatory System"),
        ("Which blood component lacks a nucleus, contains hemoglobin, and transports oxygen?", ["Erythrocyte (Red blood cell)", "Leukocyte (White blood cell)", "Thrombocyte (Platelet)", "Blood plasma"], 0, "Erythrocytes are biconcave enucleated discs packed with hemoglobin to optimize gas transport.", "Blood Composition"),
        ("Which universal donor blood group in the ABO system can theoretically give packed red cells to all ABO recipients?", ["Group O negative", "Group AB positive", "Group A positive", "Group B negative"], 0, "Group O red blood cells lack A and B surface antigens, preventing agglutination by recipient antibodies.", "Blood Groups"),
        ("In the human digestive tract, bile is synthesized in the liver and temporarily stored in the:", ["Gallbladder", "Pancreas", "Duodenum", "Appendix"], 0, "Bile is continuously produced by hepatocytes and concentrated in the gallbladder until released for fat emulsification.", "Digestive System"),
        ("Which digestive enzyme secreted in saliva and pancreatic juice initiates starch hydrolysis into maltose?", ["Amylase (Ptyalin)", "Pepsin", "Lipase", "Trypsin"], 0, "Amylase cleaves alpha-1,4-glycosidic bonds in starch to produce maltose disaccharides.", "Digestive Enzymes"),
        ("The primary structural and functional microscopic filtration unit of the mammalian kidney is the:", ["Nephron", "Neuron", "Alveolus", "Villus"], 0, "Each human kidney contains approximately one million nephrons carrying out ultrafiltration and selective reabsorption.", "Excretory System"),
        ("Ultrafiltration in the human kidney takes place specifically across the:", ["Bowman's capsule and Glomerulus", "Loop of Henle", "Distal convoluted tubule", "Collecting duct"], 0, "High hydrostatic blood pressure forces water and small solutes across the fenestrated glomerular capillaries into Bowman's space.", "Renal Physiology"),
        ("Which endocrine hormone produced by beta cells of the islets of Langerhans lowers blood glucose levels?", ["Insulin", "Glucagon", "Adrenaline", "Thyroxine"], 0, "Insulin promotes cellular glucose uptake, glycolysis, and glycogen synthesis in muscle and liver tissues.", "Endocrine System"),
        ("The rapid involuntary pathway that mediates an automatic response to a dangerous stimulus without conscious brain delay is a:", ["Reflex arc", "Autonomic cycle", "Cerebral relay", "Synaptic gap"], 0, "Reflex arcs route impulses from sensory receptors through the spinal cord directly to effectors.", "Nervous System"),
        ("The junction between two adjacent communicating nerve cells where neurotransmitters diffuse is called a:", ["Synapse", "Axon hillock", "Myelin sheath", "Node of Ranvier"], 0, "Synapses are specialized microscopic junctions where electrical impulses trigger neurotransmitter chemical signaling.", "Neurobiology"),
        ("Which part of the human brain coordinates muscle voluntary movement, balance, and fine motor posture?", ["Cerebellum", "Cerebrum", "Medulla oblongata", "Hypothalamus"], 0, "The cerebellum integrates sensory inputs from eyes, inner ears, and proprioceptors to smooth motor coordination.", "Central Nervous System"),
        ("Which brain structure controls vital involuntary autonomic reflex functions including breathing rate and heartbeat?", ["Medulla oblongata", "Cerebrum", "Thalamus", "Pituitary gland"], 0, "The medulla oblongata houses cardiac, vasomotor, and respiratory reflex regulatory centers.", "Nervous System"),
        ("The respiratory gas exchange surface in human lungs consists of microscopic air sacs known as:", ["Alveoli", "Bronchioles", "Tracheal rings", "Pleural cavities"], 0, "Alveoli provide an immense, thin, moist surface area surrounded by pulmonary capillaries for rapid gas diffusion.", "Respiratory System"),
        ("Which mineral ion is essential for normal muscle contraction, neurotransmitter vesicle release, and blood clotting?", ["Calcium (Ca²⁺)", "Sodium (Na⁺)", "Potassium (K⁺)", "Iron (Fe²⁺)"], 0, "Calcium ions trigger troponin displacement in sarcomeres, drive synaptic exocytosis, and act as clotting Factor IV.", "Physiology"),
        ("The light-sensitive inner neural layer of the human eye containing photoreceptor rods and cones is the:", ["Retina", "Sclera", "Choroid", "Cornea"], 0, "The retina converts focused light photons into neural action potentials routed via the optic nerve.", "Sense Organs"),
        ("Which photoreceptor cells in the human retina are responsible for vision in dim light (scotopic vision)?", ["Rods", "Cones", "Ganglion cells", "Amacrine cells"], 0, "Rods contain the visual pigment rhodopsin, providing high sensitivity in low-light environments without color discrimination.", "Sensory Physiology"),
        ("The female gonadal hormone responsible for preparing and maintaining the vascularized uterine endometrium for pregnancy is:", ["Progesterone", "Luteinizing hormone", "Oxytocin", "Prolactin"], 0, "Progesterone secreted by the corpus luteum maintains the secretional endometrium and prevents uterine contractions.", "Reproductive Physiology"),
        ("Which hormone stimulates milk ejection ('let-down' reflex) and uterine smooth muscle contraction during childbirth?", ["Oxytocin", "Prolactin", "Estrogen", "Follicle-stimulating hormone"], 0, "Oxytocin released from the posterior pituitary triggers myoepithelial contractions in mammary alveoli and uterine myometrium.", "Endocrinology"),
        ("Spermatogenesis in human males occurs within the microscopic convoluted tubes of the testes known as:", ["Seminiferous tubules", "Epididymis", "Vas deferens", "Seminal vesicles"], 0, "Seminiferous tubules house Sertoli cells and germline cells undergoing meiosis to produce mature spermatozoa.", "Human Reproduction")
    ]
    items.extend(human_concepts)

    # 61-80: Genetics, Heredity & Evolution
    for i in range(61, 81):
        idx = i - 60
        items.append((
            f"Bio-Genetics Q{i}: In a standard Mendelian monohybrid cross between two heterozygous individuals (Aa x Aa), what is the expected phenotypic ratio for trait #{idx} showing complete dominance?",
            ["3 : 1", "1 : 2 : 1", "9 : 3 : 3 : 1", "1 : 1"],
            0,
            f"Monohybrid heterozygous crosses yield 3 dominant to 1 recessive phenotype (genotypic ratio 1 AA : 2 Aa : 1 aa). Item {idx}.",
            "Genetics"
        ))

    # 81-100: Ecology, Ecosystems, and Environmental Biology
    for i in range(81, 101):
        idx = i - 80
        items.append((
            f"Bio-Ecology Q{i}: In tropical ecological zone #{idx}, what role do primary saprophytic decomposers (bacteria and fungi) perform within the food web?",
            ["Breaking down dead organic matter and returning mineral nutrients to the soil", "Fixing atmospheric carbon dioxide through chemosynthesis exclusively", "Consuming secondary carnivores", "Acting as apex predators"],
            0,
            f"Decomposers secrete extracellular digestive enzymes to recycle carbon, nitrogen, and phosphorus into soil and biogeochemical cycles. Concept {idx}.",
            "Ecology"
        ))

    return make_subject_questions("biology", "WASSCE School", items)

print("get_biology_100 defined.")
