# -*- coding: utf-8 -*-
"""
Generate 100 100% DISTINCT questions for:
1. English Language (BECE & WASSCE)
2. Mathematics (BECE)
3. Core Mathematics (WASSCE)
4. Integrated Science (BECE & WASSCE)
5. Social Studies (BECE & WASSCE)
6. Religious and Moral Education - RME (BECE)
7. Computing (BECE)
8. Career Technology (BECE)
"""

def get_distinct_english_100():
    items = [
        # Lexis & Structure / Synonyms (1-20)
        ("Choose the option nearest in meaning to 'diligent':", ["Hardworking and conscientious", "Careless", "Slow", "Rude"], 0, "Diligent means showing persistent care, effort, and hard work.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'candid':", ["Frank and straightforward", "Secretive", "Dishonest", "Proud"], 0, "Candid means truthful and straightforward; frank.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'abundant':", ["Plentiful", "Scarce", "Inadequate", "Rare"], 0, "Abundant means existing or available in large quantities; overflowing.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'hostile':", ["Unfriendly and antagonistic", "Welcoming", "Peaceful", "Submissive"], 0, "Hostile means showing or feeling active opposition or unfriendliness.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'lucid':", ["Clear and easy to understand", "Murky", "Confusing", "Dark"], 0, "Lucid means expressed clearly; easy to comprehend.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'frugal':", ["Economical and prudent", "Wasteful", "Generous", "Rich"], 0, "Frugal means sparing or economical with regard to money or food.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'pensive':", ["Deep in thought", "Cheerful", "Agitated", "Cruel"], 0, "Pensive means engaged in, involving, or reflecting deep or serious thought.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'lethal':", ["Deadly", "Safe", "Mild", "Beneficial"], 0, "Lethal means sufficient to cause death; fatal.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'meticulous':", ["Extremely careful and precise", "Sloppy", "Reckless", "Lazy"], 0, "Meticulous means showing great attention to detail; very careful and precise.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'obstinate':", ["Stubborn and unyielding", "Flexible", "Obedient", "Gentle"], 0, "Obstinate means stubbornly refusing to change one's opinion or chosen course of action.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'indolent':", ["Lazy and inactive", "Energetic", "Skillful", "Aggressive"], 0, "Indolent means wanting to avoid activity or exertion; lazy.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'audacious':", ["Bold and daring", "Timid", "Cowardly", "Polite"], 0, "Audacious means showing a willingness to take surprisingly bold risks.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'ambiguous':", ["Having more than one possible meaning", "Clear", "Certain", "Direct"], 0, "Ambiguous means open to more than one interpretation; not having one obvious meaning.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'benevolent':", ["Kind and generous", "Malicious", "Selfish", "Greedy"], 0, "Benevolent means well-meaning and kindly; charitable.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'covert':", ["Secret or hidden", "Open", "Public", "Famous"], 0, "Covert means not openly acknowledged or displayed; secret.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'prolific':", ["Highly productive", "Barren", "Unsuccessful", "Slow"], 0, "Prolific means producing much fruit or foliage or many works.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'tedious':", ["Monotonous and boring", "Exciting", "Brief", "Joyful"], 0, "Tedious means too long, slow, or dull; tiresome or monotonous.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'resilient':", ["Able to recover quickly from difficulties", "Fragile", "Rigid", "Hopeless"], 0, "Resilient means able to withstand or recover quickly from difficult conditions.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'vivid':", ["Clear, bright, and detailed", "Faint", "Dull", "Vague"], 0, "Vivid means producing powerful feelings or strong, clear images in the mind.", "Vocabulary"),
        ("Choose the word nearest in meaning to 'wary':", ["Cautious and alert to danger", "Reckless", "Confident", "Trusting"], 0, "Wary means feeling or showing caution about possible dangers or problems.", "Vocabulary"),

        # Antonyms (21-40)
        ("Select the word opposite in meaning to 'fragile':", ["Sturdy and robust", "Delicate", "Brittle", "Weak"], 0, "'Fragile' means easily broken; its true antonym is 'sturdy' or 'robust'.", "Antonyms"),
        ("Select the word opposite in meaning to 'arrogant':", ["Humble and modest", "Proud", "Boastful", "Haughty"], 0, "Arrogant means having an exaggerated sense of one's own importance; its opposite is humble.", "Antonyms"),
        ("Select the word opposite in meaning to 'scarce':", ["Plentiful", "Rare", "Meager", "Few"], 0, "Scarce means insufficient for the demand; plentiful is the exact opposite.", "Antonyms"),
        ("Select the word opposite in meaning to 'lenient':", ["Strict and severe", "Merciful", "Tolerant", "Kind"], 0, "Lenient means more merciful or tolerant than expected; strict is the antonym.", "Antonyms"),
        ("Select the word opposite in meaning to 'transparent':", ["Opaque", "Clear", "Lucid", "Translucent"], 0, "Transparent means permitting light to pass through clearly; opaque blocks light completely.", "Antonyms"),
        ("Select the word opposite in meaning to 'optimistic':", ["Pessimistic", "Hopeful", "Positive", "Confident"], 0, "Optimistic means expecting good outcomes; pessimistic expects the worst.", "Antonyms"),
        ("Select the word opposite in meaning to 'voluntary':", ["Compulsory", "Willing", "Free", "Optional"], 0, "Voluntary means done of one's own free will; compulsory means mandatory.", "Antonyms"),
        ("Select the word opposite in meaning to 'hostile':", ["Amicable and friendly", "Aggressive", "Bitter", "Violent"], 0, "Hostile means unfriendly; amicable means characterized by friendliness.", "Antonyms"),
        ("Select the word opposite in meaning to 'obscure':", ["Famous and well-known", "Unknown", "Hidden", "Dark"], 0, "Obscure means not known or important; famous means widely known.", "Antonyms"),
        ("Select the word opposite in meaning to 'fictitious':", ["Authentic and factual", "Invented", "Imaginary", "False"], 0, "Fictitious means created from the imagination; authentic means genuine and true.", "Antonyms"),
        ("Select the word opposite in meaning to 'permanent':", ["Temporary", "Everlasting", "Durable", "Fixed"], 0, "Permanent means lasting indefinitely; temporary means lasting for a limited time.", "Antonyms"),
        ("Select the word opposite in meaning to 'rigid':", ["Flexible", "Hard", "Strict", "Tough"], 0, "Rigid means unable to bend; flexible means capable of bending easily.", "Antonyms"),
        ("Select the word opposite in meaning to 'expand':", ["Contract", "Enlarge", "Grow", "Widen"], 0, "Expand means to become larger; contract means to decrease in size.", "Antonyms"),
        ("Select the word opposite in meaning to 'guilty':", ["Innocent", "Blameworthy", "Convicted", "Responsible"], 0, "Guilty means responsible for a specified wrongdoing; innocent means free from guilt.", "Antonyms"),
        ("Select the word opposite in meaning to 'hazard':", ["Safety", "Peril", "Danger", "Risk"], 0, "Hazard means a potential source of danger; safety is freedom from danger.", "Antonyms"),
        ("Select the word opposite in meaning to 'harmony':", ["Discord and conflict", "Agreement", "Peace", "Symphony"], 0, "Harmony means agreement and concord; discord is disagreement between people.", "Antonyms"),
        ("Select the word opposite in meaning to 'reckless':", ["Prudent and cautious", "Careless", "Rash", "Wild"], 0, "Reckless means without thinking of consequences; prudent shows foresight and care.", "Antonyms"),
        ("Select the word opposite in meaning to 'trivial':", ["Crucial and important", "Minor", "Petty", "Unimportant"], 0, "Trivial means of little value or importance; crucial means decisive or critical.", "Antonyms"),
        ("Select the word opposite in meaning to 'generous':", ["Miserly and stingy", "Charitable", "Kind", "Open-handed"], 0, "Generous means showing readiness to give; miserly means hoarding and refusing to give.", "Antonyms"),
        ("Select the word opposite in meaning to 'vague':", ["Precise and clear", "Unclear", "Indistinct", "Hazy"], 0, "Vague means uncertain or indefinite; precise means exact and accurate.", "Antonyms"),

        # Grammar & Concord (41-60)
        ("Identify the correct preposition: 'Ama is interested _____ pursuing civil engineering.'", ["in", "at", "for", "with"], 0, "The adjective 'interested' collocates specifically with the preposition 'in'.", "Grammar"),
        ("Choose the correct verb: 'Neither the headmaster nor the teachers _____ at the meeting.'", ["were", "was", "is", "has been"], 0, "In 'neither...nor', the verb agrees with the nearer subject ('teachers', plural: were).", "Grammar"),
        ("Choose the correct verb: 'Every one of the applicants _____ qualified for the scholarship.'", ["is", "are", "were", "have been"], 0, "'Every one' is grammatically singular and takes a singular verb: 'is'.", "Grammar"),
        ("Choose the correct passive voice: 'The committee submitted the annual financial report.'", ["The annual financial report was submitted by the committee.", "The report submits the committee.", "The report has being submitted.", "The committee was submitted."], 0, "Past simple active 'submitted' becomes 'was submitted' in standard passive voice.", "Grammar"),
        ("Choose the correctly punctuated sentence:", ["Although it was raining heavily, the students walked to school.", "Although it was raining heavily the students walked to school.", "Although, it was raining heavily the students walked to school.", "Although it was raining heavily; the students walked."], 0, "A subordinate introductory clause must be separated from the main clause by a comma.", "Punctuation"),
        ("Complete the sentence: 'She had hardly entered the hall _____ the lecture began.'", ["when", "than", "then", "after"], 0, "'Hardly' and 'scarcely' pair correlatively with 'when' (not 'than').", "Grammar"),
        ("Complete the sentence: 'No sooner had the bell rung _____ the children rushed out.'", ["than", "when", "then", "before"], 0, "'No sooner' pairs strictly with 'than' in inverted introductory time structures.", "Grammar"),
        ("Choose the correct tag: 'You will submit your project tomorrow, _____?'", ["won't you", "will you", "would you", "don't you"], 0, "A positive statement with auxiliary 'will' takes a negative tag: 'won't you?'.", "Grammar"),
        ("Choose the correct tag: 'The candidates have not completed the test, _____?'", ["have they", "haven't they", "did they", "do they"], 0, "A negative statement with 'have not' takes a positive tag: 'have they?'.", "Grammar"),
        ("Choose the correct conditional form: 'If I had seen Kwame, I _____ him the good news.'", ["would have told", "will tell", "would tell", "will have told"], 0, "Third conditional uses 'if + had + past participle' followed by 'would have + past participle'.", "Grammar"),
        ("Choose the correct form: 'The luggage _____ too heavy for the boy to carry.'", ["was", "were", "are", "have been"], 0, "'Luggage' is an uncountable noun in English and strictly takes a singular verb.", "Grammar"),
        ("Choose the correct form: 'The police _____ investigating the cause of the fire outbreak.'", ["are", "is", "was", "has been"], 0, "'Police' is a plural collective noun requiring a plural verb: 'are'.", "Grammar"),
        ("Choose the correct word: 'Between you and _____, the test was rather difficult.'", ["me", "I", "myself", "mine"], 0, "'Between' is a preposition requiring an objective case pronoun: 'between you and me'.", "Grammar"),
        ("Choose the correct option: 'Kwame prefers reading novels _____ watching movies.'", ["to", "than", "more than", "instead"], 0, "The verb 'prefer' takes the preposition 'to' when comparing two activities.", "Grammar"),
        ("Choose the correct pronoun: 'One must do _____ best in every examination.'", ["one's", "his", "their", "her"], 0, "The indefinite pronoun 'one' takes the possessive form 'one's'.", "Grammar"),
        ("Choose the correct option: 'The news broadcast by GBC yesterday _____ encouraging.'", ["was", "were", "are", "have been"], 0, "'News' is grammatically singular and takes the singular verb 'was'.", "Grammar"),
        ("Choose the correct preposition: 'The student was accused _____ cheating in the mock examination.'", ["of", "for", "with", "about"], 0, "The verb 'accuse' is followed by the preposition 'of'.", "Grammar"),
        ("Choose the correct preposition: 'The headmistress congratulated the debate team _____ their victory.'", ["on", "for", "at", "about"], 0, "One congratulates someone 'on' an achievement or milestone.", "Grammar"),
        ("Choose the correct relative pronoun: 'The lady _____ car broke down was assisted by the mechanics.'", ["whose", "who", "whom", "which"], 0, "'Whose' is the possessive relative pronoun referring to ownership.", "Grammar"),
        ("Choose the correct word: 'Neither of the two candidates _____ selected for the interview.'", ["was", "were", "are", "have been"], 0, "'Neither of the two' is singular and takes a singular verb: 'was'.", "Grammar"),

        # Idiomatic Expressions & Comprehension (61-80)
        ("What does the idiom 'to beat about the bush' mean?", ["To avoid talking directly about what is important", "To clear a path in the forest", "To search for lost items", "To fight someone outdoors"], 0, "To beat about the bush means to discuss a matter without coming directly to the point.", "Idioms"),
        ("What does the idiom 'to see eye to eye' mean?", ["To agree fully with someone", "To look directly at someone's face", "To visit an optician", "To be envious"], 0, "'To see eye to eye' means to be in complete agreement with another person.", "Idioms"),
        ("What does the idiom 'a white elephant' mean?", ["A possession that is useless and expensive to maintain", "A very rare sacred animal", "A large commercial victory", "An albino mammal"], 0, "A white elephant is a possession that is useless or troublesome, especially one that is expensive to maintain.", "Idioms"),
        ("What does the idiom 'to cry over spilt milk' mean?", ["To worry about past mistakes that cannot be undone", "To waste precious beverage", "To feed an infant", "To show deep affection"], 0, "It means wasting time worrying or regretting something that has already happened and cannot be altered.", "Idioms"),
        ("What does the idiom 'to hit the nail on the head' mean?", ["To describe exactly what is causing a situation", "To engage in manual carpentry", "To injure one's finger", "To make a loud noise"], 0, "To hit the nail on the head means to find the exact answer or identify the core truth.", "Idioms"),
        ("What does the idiom 'to turn a blind eye' mean?", ["To knowingly pretend not to notice something wrong", "To lose one's eyesight", "To look in another direction", "To sleep deeply"], 0, "Turning a blind eye means deliberately ignoring or pretending not to notice bad behavior.", "Idioms"),
        ("What does the idiom 'to bark up the wrong tree' mean?", ["To pursue a mistaken line of thought or action", "To disturb domestic animals", "To climb an oak tree", "To be confused by nature"], 0, "It means having a completely false idea or pursuing a wrong course of inquiry.", "Idioms"),
        ("What does the idiom 'burn the midnight oil' mean?", ["To study or work late into the night", "To waste kerosene", "To cause an accidental fire", "To cook late meals"], 0, "Burning the midnight oil refers to staying up late studying or working diligently.", "Idioms"),
        ("What does the idiom 'under the weather' mean?", ["Feeling slightly sick or unwell", "Standing in the rain", "Predicting the climate", "Enjoying the breeze"], 0, "Being 'under the weather' is an idiom meaning slightly unwell or depressed.", "Idioms"),
        ("What does the idiom 'a blessing in disguise' mean?", ["A good thing that seemed bad at first", "A prayer by a priest", "A gift given in secret", "A costume worn at a festival"], 0, "A blessing in disguise is an apparent misfortune that eventually has good results.", "Idioms"),
        ("What does the idiom 'bite the bullet' mean?", ["To endure an unavoidable painful experience courageously", "To chew metallic objects", "To prepare for warfare", "To refuse an order"], 0, "To bite the bullet means to face a difficult situation with courage and fortitude.", "Idioms"),
        ("What does the idiom 'spill the beans' mean?", ["To disclose confidential information prematurely", "To drop farm crops accidentally", "To prepare lunch", "To waste legumes"], 0, "Spilling the beans means unintentionally or prematurely revealing a secret.", "Idioms"),
        ("What does the idiom 'cost an arm and a leg' mean?", ["To be extremely expensive", "To suffer physical injury", "To buy medical prosthetics", "To pay fair value"], 0, "'Costing an arm and a leg' denotes an excessively high price.", "Idioms"),
        ("What does the idiom 'cut corners' mean?", ["To do something badly or cheaply to save time or money", "To trim geometric sheets", "To take an alleyway", "To drive dangerously"], 0, "Cutting corners means undertaking a task without due thoroughness to economize time or funds.", "Idioms"),
        ("What does the idiom 'piece of cake' mean?", ["Something that is very easy to accomplish", "A slice of baked dessert", "A small portion of land", "A sweet reward"], 0, "'A piece of cake' characterizes a task that is exceptionally easy and straightforward.", "Idioms"),
        ("What does the idiom 'at the eleventh hour' mean?", ["At the last possible moment", "Late at night before midnight", "During midday assembly", "Before morning prayers"], 0, "The eleventh hour denotes the latest possible moment before a deadline.", "Idioms"),
        ("What does the idiom 'throw in the towel' mean?", ["To surrender or admit defeat", "To dry one's face after sports", "To clean the gymnasium floor", "To purchase bathroom items"], 0, "Originating in boxing, throwing in the towel signifies admitting defeat and quitting.", "Idioms"),
        ("What does the idiom 'break the ice' mean?", ["To make people feel more relaxed in a social setting", "To crush ice blocks in a freezer", "To go fishing in cold regions", "To cause an argument"], 0, "Breaking the ice means initiating conversation to relieve social awkwardness.", "Idioms"),
        ("What does the idiom 'let the cat out of the bag' mean?", ["To reveal a secret by mistake", "To release a pet animal", "To unpack groceries", "To purchase livestock"], 0, "It means allowing a secret to become known, often carelessly or unexpectedly.", "Idioms"),
        ("What does the idiom 'take with a pinch of salt' mean?", ["To view a statement with skepticism", "To add seasoning to soup", "To doubt one's cooking", "To accept everything naively"], 0, "To take something with a pinch of salt means not completely believing what one is told.", "Idioms"),

        # Spelling, Literary Devices & Mechanics (81-100)
        ("Choose the correct spelling of the word meaning to provide lodging or room for:", ["Accommodate", "Acommodate", "Accomodate", "Acomodate"], 0, "'Accommodate' is correctly spelled with double 'c' and double 'm'.", "Spelling"),
        ("Choose the correct spelling of the word meaning an incident or event that happens:", ["Occurrence", "Occurence", "Ocurrence", "Occurrance"], 0, "'Occurrence' requires double 'c', double 'r', and the suffix '-ence'.", "Spelling"),
        ("Choose the correct spelling of the word meaning a special right, advantage, or immunity:", ["Privilege", "Privelege", "Priviledge", "Privilegey"], 0, "'Privilege' has no 'd' in its spelling.", "Spelling"),
        ("Choose the correct spelling of the word meaning a feeling of self-conscious distress or shame:", ["Embarrassment", "Embarassment", "Embarasment", "Embarrasment"], 0, "'Embarrassment' is spelled with double 'r' and double 's'.", "Spelling"),
        ("Choose the correct spelling of the word meaning the process of preserving a condition or situation:", ["Maintenance", "Maintainance", "Maintanence", "Maintenence"], 0, "The noun form derived from 'maintain' is spelled 'maintenance'.", "Spelling"),
        ("What figure of speech gives human attributes to non-human entities?", ["Personification", "Simile", "Metaphor", "Hyperbole"], 0, "Personification attributes human qualities, emotions, or behaviors to animals or objects.", "Literary Devices"),
        ("Identify the literary device in: 'The camel is the ship of the desert.'", ["Metaphor", "Simile", "Oxymoron", "Alliteration"], 0, "A metaphor makes a direct comparison without using 'like' or 'as'.", "Literary Devices"),
        ("Identify the figure of speech in: 'Her tears flowed like an endless river.'", ["Simile", "Metaphor", "Irony", "Pun"], 0, "A simile uses comparison words such as 'like' or 'as'.", "Literary Devices"),
        ("Identify the figure of speech in: 'The thunder roared angrily across the valley.'", ["Personification", "Hyperbole", "Euphemism", "Litotes"], 0, "Attributing anger to thunder is a classic example of personification.", "Literary Devices"),
        ("What literary term denotes the repetition of initial consonant sounds in neighboring words?", ["Alliteration", "Assonance", "Consonance", "Onomatopoeia"], 0, "Alliteration is the repetition of the same consonant sound at the start of adjacent words.", "Literary Devices"),
        ("Identify the device in: 'I have told you a million times to sit down.'", ["Hyperbole", "Simile", "Understatement", "Metonymy"], 0, "Hyperbole is an intentional and dramatic exaggeration not meant to be taken literally.", "Literary Devices"),
        ("What figure of speech uses pleasant or mild phrasing to mask a harsh reality?", ["Euphemism", "Hyperbole", "Synecdoche", "Apostrophe"], 0, "A euphemism substitutes a mild or indirect term for one considered harsh or blunt (e.g. 'passed away').", "Literary Devices"),
        ("Identify the literary device in: 'The classroom was an absolute silence deafened by whispers.'", ["Oxymoron", "Simile", "Alliteration", "Acrostic"], 0, "An oxymoron brings together two contradictory terms in a single phrase.", "Literary Devices"),
        ("What poetic device reproduces the sound of the object it depicts (e.g., 'buzz', 'hiss')?", ["Onomatopoeia", "Metaphor", "Symbolism", "Allegory"], 0, "Onomatopoeia words phonetically imitate or resemble the sound that they describe.", "Literary Devices"),
        ("What is the central message or underlying moral meaning of a literary text called?", ["Theme", "Plot", "Setting", "Climax"], 0, "The theme represents the fundamental idea, moral, or philosophical inquiry explored in a story.", "Literary Devices"),
        ("The physical location and time period in which a story unfolds is termed the:", ["Setting", "Plot", "Conflict", "Resolution"], 0, "The setting establishes the geographical, temporal, and historical backdrop of a narrative.", "Literary Devices"),
        ("The turning point of greatest emotional intensity in a dramatic plot is the:", ["Climax", "Exposition", "Denouement", "Foreshadowing"], 0, "The climax represents the structural peak of dramatic action and decisive conflict resolution.", "Literary Devices"),
        ("A character who directly opposes and creates obstacles for the protagonist is the:", ["Antagonist", "Foil", "Narrator", "Hero"], 0, "The antagonist stands in opposition to the protagonist, driving narrative tension.", "Literary Devices"),
        ("A poem of fourteen lines structured in iambic pentameter is universally known as a:", ["Sonnet", "Ballad", "Epic", "Elegy"], 0, "A sonnet is a fixed-form lyric poem consisting of fourteen metrical lines.", "Literary Devices"),
        ("A mournful, reflective poem composed specifically to lament someone's death is an:", ["Elegy", "Ode", "Oration", "Epic"], 0, "An elegy is a song or poem written in meditative grief for someone who has died.", "Literary Devices")
    ]

    questions = []
    for idx, item in enumerate(items):
        questions.append({
            "id": f"english-language-2027-{idx+1:03d}",
            "releaseYear": "2027",
            "examFamily": "BECE",
            "subjectId": "english-language",
            "topic": item[4],
            "syllabusRef": f"WAEC / NaCCA English Language Curriculum - {item[4]} Item {idx+1}",
            "stem": item[0],
            "options": item[1],
            "answerIndex": item[2],
            "explanation": item[3],
            "difficulty": "Easy" if idx % 3 == 0 else "Medium" if idx % 3 == 1 else "Hard",
            "marks": 1,
            "status": "published",
            "version": 1,
            "createdAt": "2027-01-15T00:00:00Z"
        })
    return questions

print("Distinct English generator defined.")
