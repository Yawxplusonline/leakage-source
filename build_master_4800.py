# -*- coding: utf-8 -*-
"""
Master compiler for all 48 subjects:
- Exactly 100 questions per subject
- 100% unique stems per subject (no cyclical loops or Question X: prefixes)
- Writes directly to data/questions_100_bank.json
"""
import json
import os

# 1. BECE & Core Group
from gen_distinct_english import get_distinct_english_100 as gen_distinct_english
from gen_distinct_math import get_distinct_math_100 as gen_distinct_math
from gen_distinct_science import get_distinct_science_100 as gen_distinct_science
from gen_distinct_core import get_distinct_social_studies_100 as gen_distinct_social_studies
from build_rme import rme_raw
from build_computing import computing_raw
from build_career_technology import career_tech_raw
from gen_distinct_french import get_distinct_french_100 as gen_distinct_french
from gen_distinct_twi import get_distinct_twi_100 as gen_distinct_twi
from gen_distinct_arabic import get_distinct_arabic_100 as gen_distinct_arabic
from build_core_math import get_core_math_100 as build_core_math
from build_biology_100 import make_subject_questions

# 2. Sciences & Math Electives
from build_biology_100 import build_biology
from build_chemistry_100 import build_chemistry
from build_physics_100 import build_physics
from build_elective_math_100 import build_elective_math
from build_elective_ict_100 import build_elective_ict

# 3. Business Group
from build_business_group import build_business_management
from build_financial_accounting_100 import build_financial_accounting
from build_cost_accounting_100 import build_cost_accounting
from build_typewriting_100 import build_typewriting
from build_clerical_duties_100 import build_clerical_office_duties

# 4. Humanities Group 1
from build_humanities_group_1 import build_government
from build_history_100 import build_history
from build_geography_100 import build_geography
from build_economics_100 import build_economics
from build_literature_100 import build_literature_in_english as build_literature

# 5. Humanities Group 2
from build_crs_100 import build_crs
from build_irs_100 import build_irs
from build_traditional_religion_100 import build_traditional_religion
from build_music_100 import build_music

# 6. Visual Arts Group
from build_gka_100 import build_gka
from build_graphic_design_100 import build_graphic_design
from build_picture_making_100 import build_picture_making
from build_basketry_100 import build_basketry
from build_ceramics_100 import build_ceramics
from build_jewellery_100 import build_jewellery
from build_leatherwork_100 import build_leatherwork
from build_sculpture_100 import build_sculpture
from build_textiles_100 import build_textiles

# 7. Home Economics & Agriculture Group
from build_management_in_living_100 import build_management_in_living
from build_clothing_and_textiles_100 import build_clothing_and_textiles
from build_foods_and_nutrition_100 import build_foods_and_nutrition
from build_general_agriculture_100 import build_general_agriculture
from build_animal_husbandry_100 import build_animal_husbandry
from build_crop_husbandry_100 import build_crop_husbandry
from build_fisheries_100 import build_fisheries
from build_forestry_100 import build_forestry


def compile_all():
    print("Compiling all 48 subjects...")
    master_bank = []
    subject_map = {}

    def add_subject(sub_id, questions, expected_exam=None):
        assert len(questions) == 100, f"Subject {sub_id} has {len(questions)} items, expected 100"
        stems = set(q['stem'].strip() for q in questions)
        assert len(stems) == 100, f"Subject {sub_id} has duplicate stems: {len(stems)}/100"
        
        # Verify no Question X: cyclical repeats
        for q in questions:
            assert not q['stem'].startswith("Question "), f"Subject {sub_id} has placeholder stem: {q['stem']}"
            if expected_exam:
                q['examFamily'] = expected_exam
            q['subjectId'] = sub_id
        
        master_bank.extend(questions)
        subject_map[sub_id] = len(questions)
        print(f"  [OK] {sub_id}: 100 distinct questions verified.")

    # 1. BECE core
    add_subject("english-language", gen_distinct_english(), "BECE")
    add_subject("mathematics", gen_distinct_math(), "BECE")
    add_subject("integrated-science", gen_distinct_science(), "BECE")
    add_subject("social-studies", gen_distinct_social_studies(), "BECE")
    add_subject("rme", make_subject_questions("rme", "BECE", rme_raw), "BECE")
    add_subject("computing", make_subject_questions("computing", "BECE", computing_raw), "BECE")
    add_subject("career-technology", make_subject_questions("career-technology", "BECE", career_tech_raw), "BECE")
    add_subject("french", gen_distinct_french(), "BECE")
    add_subject("twi", gen_distinct_twi(), "BECE")
    
    # 2. WASSCE Core & Languages
    add_subject("core-mathematics", build_core_math(), "WASSCE School")
    add_subject("arabic", gen_distinct_arabic(), "WASSCE School")
    
    # Ghanaian Language (WASSCE) uses distinct authentic Akan/Twi bank with WASSCE tag
    gh_lang_qs = gen_distinct_twi()
    for idx, q in enumerate(gh_lang_qs):
        q["id"] = f"ghanaian-language-2027-{idx+1:03d}"
        q["subjectId"] = "ghanaian-language"
        q["examFamily"] = "WASSCE School"
    add_subject("ghanaian-language", gh_lang_qs, "WASSCE School")

    # 3. Sciences & Math Electives
    add_subject("biology", build_biology(), "WASSCE School")
    add_subject("chemistry", build_chemistry(), "WASSCE School")
    add_subject("physics", build_physics(), "WASSCE School")
    add_subject("elective-mathematics", build_elective_math(), "WASSCE School")
    add_subject("elective-ict", build_elective_ict(), "WASSCE School")

    # 4. Business Group
    add_subject("business-management", build_business_management(), "WASSCE School")
    add_subject("financial-accounting", build_financial_accounting(), "WASSCE School")
    add_subject("cost-accounting", build_cost_accounting(), "WASSCE School")
    add_subject("typewriting", build_typewriting(), "WASSCE School")
    add_subject("clerical-office-duties", build_clerical_office_duties(), "WASSCE School")

    # 5. Humanities Group 1
    add_subject("government", build_government(), "WASSCE School")
    add_subject("history", build_history(), "WASSCE School")
    add_subject("geography", build_geography(), "WASSCE School")
    add_subject("economics", build_economics(), "WASSCE School")
    add_subject("literature-in-english", build_literature(), "WASSCE School")

    # 6. Humanities Group 2
    add_subject("christian-religious-studies", build_crs(), "WASSCE School")
    add_subject("islamic-religious-studies", build_irs(), "WASSCE School")
    add_subject("traditional-religion", build_traditional_religion(), "WASSCE School")
    add_subject("music", build_music(), "WASSCE School")

    # 7. Visual Arts Group
    add_subject("general-knowledge-in-art", build_gka(), "WASSCE School")
    add_subject("graphic-design", build_graphic_design(), "WASSCE School")
    add_subject("picture-making", build_picture_making(), "WASSCE School")
    add_subject("basketry", build_basketry(), "WASSCE School")
    add_subject("ceramics", build_ceramics(), "WASSCE School")
    add_subject("jewellery", build_jewellery(), "WASSCE School")
    add_subject("leatherwork", build_leatherwork(), "WASSCE School")
    add_subject("sculpture", build_sculpture(), "WASSCE School")
    add_subject("textiles", build_textiles(), "WASSCE School")

    # 8. Home Economics & Agriculture Group
    add_subject("management-in-living", build_management_in_living(), "WASSCE School")
    add_subject("clothing-and-textiles", build_clothing_and_textiles(), "WASSCE School")
    add_subject("foods-and-nutrition", build_foods_and_nutrition(), "WASSCE School")
    add_subject("general-agriculture", build_general_agriculture(), "WASSCE School")
    add_subject("animal-husbandry", build_animal_husbandry(), "WASSCE School")
    add_subject("crop-husbandry-and-horticulture", build_crop_husbandry(), "WASSCE School")
    add_subject("fisheries", build_fisheries(), "WASSCE School")
    add_subject("forestry", build_forestry(), "WASSCE School")

    print("\nSummary:")
    print(f"Total Subjects: {len(subject_map)}")
    print(f"Total Questions: {len(master_bank)}")
    assert len(master_bank) == 4800, f"Expected 4800 questions, got {len(master_bank)}"
    assert len(subject_map) == 48, f"Expected 48 subjects, got {len(subject_map)}"

    # Write to questions_100_bank.json
    out_path = os.path.join("data", "questions_100_bank.json")
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(master_bank, f, ensure_ascii=False, indent=2)
    print(f"Saved {len(master_bank)} questions to {out_path} ({os.path.getsize(out_path)} bytes)")

    # Convert to TypeScript seed file: data/seedQuestions.ts
    seed_path = os.path.join("data", "seedQuestions.ts")
    with open(seed_path, "w", encoding="utf-8") as f:
        f.write('import { QuestionItem } from "./types";\n\n')
        f.write('export const INITIAL_2027_QUESTIONS: QuestionItem[] = ')
        json.dump(master_bank, f, ensure_ascii=False, indent=2)
        f.write(';\n')
    print(f"Saved TypeScript seed to {seed_path} ({os.path.getsize(seed_path)} bytes)")

if __name__ == "__main__":
    compile_all()
