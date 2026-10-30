# -*- coding: utf-8 -*-
"""
Sciences Question Pool:
- Biology (100)
- Chemistry (100)
- Physics (100)
- Elective Mathematics (100)
- Elective ICT (100)
"""

def make_subject_questions(subject_id, exam_family, items):
    assert len(items) == 100, f"Expected 100 items for {subject_id}, got {len(items)}"
    stems = set(it[0] for it in items)
    assert len(stems) == 100, f"Duplicate stems in {subject_id}: {len(items)} vs {len(stems)}"
    
    questions = []
    for idx, item in enumerate(items):
        questions.append({
            "id": f"{subject_id}-2027-{idx+1:03d}",
            "releaseYear": "2027",
            "examFamily": exam_family,
            "subjectId": subject_id,
            "topic": item[4],
            "syllabusRef": f"WAEC Syllabus - {item[4]} Q{idx+1}",
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

print("make_subject_questions ready.")
