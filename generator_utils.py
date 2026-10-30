# -*- coding: utf-8 -*-
"""
Helper generator to create 100 unique questions for any syllabus subject.
Each question has a unique stem, 4 plausible options, correct answer index, explanation, and subtopic.
"""

def make_q(stem, options, ans_idx, explanation, topic):
    assert len(options) == 4, f"Options must have 4 items: {options}"
    assert 0 <= ans_idx <= 3, f"Invalid ans_idx: {ans_idx}"
    return (stem, options, ans_idx, explanation, topic)

print("make_q ready.")
