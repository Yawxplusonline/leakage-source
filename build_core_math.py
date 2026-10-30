# -*- coding: utf-8 -*-
import json

def get_core_math_100():
    items = []
    # 1-20: Number & Numeration, Sets, Surds, Logs, Modular Arithmetic
    items.append(("If universal set U = {x: 1 <= x <= 12, x is an integer} and A = {prime numbers}, find n(A').", ["7", "5", "6", "8"], 0, "Primes in U: {2, 3, 5, 7, 11}, so n(A)=5. Therefore n(A') = 12 - 5 = 7.", "Sets"))
    items.append(("Simplify without using tables or calculator: log₁₀(25) + log₁₀(40) - log₁₀(10).", ["2", "1", "3", "4"], 0, "log₁₀(25 × 40 / 10) = log₁₀(1000/10) = log₁₀(100) = 2.", "Logarithms"))
    items.append(("Simplify the surd expression: √75 + √48 - √108.", ["3√3", "2√3", "4√3", "5√3"], 0, "√75 = 5√3, √48 = 4√3, √108 = 6√3. Sum = 5√3 + 4√3 - 6√3 = 3√3.", "Surds"))
    items.append(("Rationalize the denominator of: 6 / (√5 - √2).", ["2(√5 + √2)", "3(√5 + √2)", "√5 + √2", "6(√5 + √2)"], 0, "Multiply numerator and denominator by (√5 + √2). Denominator = 5 - 2 = 3. 6/3 = 2, so 2(√5 + √2).", "Surds"))
    items.append(("Evaluate in modular arithmetic: (37 × 45) mod 7.", ["2", "3", "1", "4"], 0, "37 mod 7 = 2. 45 mod 7 = 3. (2 × 3) mod 7 = 6 mod 7 ... wait: 37 = 5×7+2, 45 = 6×7+3. Product = 6. Let's make options [6, 2, 3, 1] with ans=0.", "Modular Arithmetic"))
    # Let's adjust items[4]
    items[4] = ("Evaluate in modular arithmetic: (37 × 45) mod 7.", ["6", "2", "3", "1"], 0, "37 mod 7 = 2, 45 mod 7 = 3. (2 × 3) mod 7 = 6.", "Modular Arithmetic")
    items.append(("Convert 231 in base 4 to a base 10 numeral.", ["45", "41", "47", "39"], 0, "2(4²) + 3(4¹) + 1(4⁰) = 2(16) + 12 + 1 = 32 + 13 = 45.", "Number Bases"))
    items.append(("Solve for x: 3^(2x - 1) = 27.", ["2", "3", "1", "4"], 0, "27 = 3³, so 2x - 1 = 3 => 2x = 4 => x = 2.", "Indices"))
    items.append(("If (x - 2) is a factor of f(x) = x³ - 4x² + kx - 6, find the value of k.", ["7", "5", "8", "6"], 0, "By Factor Theorem, f(2) = 0. 2³ - 4(2²) + k(2) - 6 = 0 => 8 - 16 + 2k - 6 = 0 => 2k = 14 => k = 7.", "Polynomials"))
    items.append(("Find the truth set of the quadratic equation: 2x² - 5x - 3 = 0.", ["{3, -1/2}", "{-3, 1/2}", "{3, 1/2}", "{-3, -1/2}"], 0, "(2x + 1)(x - 3) = 0 => x = 3 or x = -1/2.", "Quadratic Equations"))
    items.append(("The roots of the equation x² - px + 12 = 0 are α and β. If α + β = 7, find the value of p.", ["7", "-7", "12", "-12"], 0, "For x² - px + 12 = 0, sum of roots α + β = p = 7.", "Quadratic Equations"))
    
    for i in range(11, 21):
        n = i * 3
        items.append((
            f"If an arithmetic progression has first term a = {i} and common difference d = 4, find the 10th term.",
            [f"{i + 9*4}", f"{i + 10*4}", f"{i + 8*4}", f"{i + 9*4 + 2}"],
            0,
            f"T₁₀ = a + (10 - 1)d = {i} + 36 = {i + 36}.",
            "Sequences and Series"
        ))

    # 21-40: Algebra, Simultaneous equations, Variations, Inequalities
    for i in range(21, 31):
        val = i * 2
        items.append((
            f"Solve the linear inequality: 3x - 5 < {val - 5}.",
            [f"x < {val//3 * 3 / 3}", f"x > {val//3}", f"x <= {val//3}", f"x >= {val//3}"],
            0,
            f"3x < {val} => x < {val}/3.",
            "Inequalities"
        ))
    # Let's write specific clean questions for 21-40
    items = items[:20] # keep first 20

    # Let's write procedurally generated mathematically rigorous distinct questions for Core Math 1-100:
    for i in range(21, 101):
        if i <= 30:
            # Simultaneous equations & variations
            c1 = i + 2
            c2 = 2*i + 1
            items.append((
                f"Given the simultaneous equations: x + y = {c1} and 2x - y = {c2}, find the value of x.",
                [f"{(c1 + c2)//3}", f"{(c1 + c2)//3 + 1}", f"{(c1 + c2)//3 - 1}", f"{(c1 + c2)//3 + 2}"],
                0,
                f"Adding both equations: 3x = {c1 + c2} => x = {(c1 + c2)/3:.0f}.",
                "Simultaneous Equations"
            ))
        elif i <= 40:
            # Coordinate geometry
            x1, y1 = i - 30, (i - 30)*2
            x2, y2 = x1 + 4, y1 + 8
            items.append((
                f"Find the gradient of the straight line joining points P({x1}, {y1}) and Q({x2}, {y2}).",
                ["2", "1/2", "-2", "4"],
                0,
                f"Gradient m = (y2 - y1)/(x2 - x1) = ({y2} - {y1})/({x2} - {x1}) = 8/4 = 2.",
                "Coordinate Geometry"
            ))
        elif i <= 50:
            # Circle theorems and angles
            angle = 30 + (i - 40)*4
            items.append((
                f"In a circle with centre O, if the angle subtended by an arc at the centre is {2*angle}°, find the angle subtended by the same arc at the circumference.",
                [f"{angle}°", f"{2*angle}°", f"{angle//2}°", f"{180 - angle}°"],
                0,
                f"Angle at circumference is half the angle at the centre: {2*angle}° ÷ 2 = {angle}°.",
                "Circle Theorems"
            ))
        elif i <= 60:
            # Trigonometry (sine, cosine, tangent)
            opp = i - 50 + 3
            adj = 4
            hyp = 5
            items.append((
                f"In a right-angled triangle, if opposite side = {3*(i-50)} cm and adjacent side = {4*(i-50)} cm, calculate the hypotenuse.",
                [f"{5*(i-50)} cm", f"{6*(i-50)} cm", f"{7*(i-50)} cm", f"{4*(i-50)+2} cm"],
                0,
                f"By Pythagoras: h = √[({3*(i-50)})² + ({4*(i-50)})²] = {5*(i-50)} cm.",
                "Trigonometry"
            ))
        elif i <= 70:
            # Mensuration: cylinder, cone, sphere
            r = i - 60
            items.append((
                f"Find the curved surface area of a cylinder of radius r = {r} cm and height h = 7 cm (use π = 22/7).",
                [f"{44 * r} cm²", f"{22 * r} cm²", f"{88 * r} cm²", f"{14 * r} cm²"],
                0,
                f"Curved Surface Area = 2πrh = 2 × (22/7) × {r} × 7 = 44 × {r} = {44*r} cm².",
                "Mensuration"
            ))
        elif i <= 80:
            # Matrices & Determinants
            a = i - 70
            b = 2
            c = 3
            d = 4
            det = a*d - b*c
            items.append((
                f"Calculate the determinant of the 2x2 matrix M = [[{a}, {b}], [{c}, {d}]].",
                [f"{det}", f"{det + 2}", f"{det - 2}", f"{det + 4}"],
                0,
                f"det(M) = ({a} × {d}) - ({b} × {c}) = {a*d} - {b*c} = {det}.",
                "Matrices"
            ))
        elif i <= 90:
            # Statistics: Mean, Median, Mode
            base = i - 80
            vals = [base, base+2, base+4, base+6, base+8]
            mean = sum(vals) // 5
            items.append((
                f"Find the arithmetic mean of the set of numbers: {vals[0]}, {vals[1]}, {vals[2]}, {vals[3]}, {vals[4]}.",
                [f"{mean}", f"{mean+1}", f"{mean-1}", f"{mean+2}"],
                0,
                f"Mean = ({vals[0]} + {vals[1]} + {vals[2]} + {vals[3]} + {vals[4]}) / 5 = {sum(vals)} / 5 = {mean}.",
                "Statistics"
            ))
        else:
            # Probability
            blue = i - 90 + 2
            red = 10 - blue
            items.append((
                f"A bag contains {blue} blue balls and {red} red balls. If one ball is picked at random, what is the probability that it is blue?",
                [f"{blue}/10", f"{red}/10", f"1/{blue}", f"{blue}/5"],
                0,
                f"Total balls = {blue} + {red} = 10. P(blue) = {blue}/10.",
                "Probability"
            ))

    questions = []
    for idx, item in enumerate(items):
        questions.append({
            "id": f"core-mathematics-2027-{idx+1:03d}",
            "releaseYear": "2027",
            "examFamily": "WASSCE School",
            "subjectId": "core-mathematics",
            "topic": item[4],
            "syllabusRef": f"WAEC Core Mathematics Syllabus - {item[4]} Q{idx+1}",
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

print("get_core_math_100 defined.")
