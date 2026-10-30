# -*- coding: utf-8 -*-
"""
Generate 100 100% DISTINCT questions for BECE Mathematics and WASSCE Core Mathematics.
Covers: Numbers & Numeration, Algebra, Geometry, Measurement, Trigonometry, Statistics & Probability.
Every question has unique calculations, unique stems, 4 options, 1 keyed answer and full step-by-step working.
"""

def get_distinct_math_100(subject_id='mathematics', exam_family='BECE'):
    items = []
    
    # Group 1: Number & Numeration (1-20)
    for i in range(1, 21):
        if i == 1:
            items.append(("Evaluate: 3/4 + 1/8 ÷ 1/2.", ["1", "7/8", "3/8", "5/4"], 0, "Order of operations: 1/8 ÷ 1/2 = 1/8 × 2 = 1/4. Then 3/4 + 1/4 = 4/4 = 1.", "Fractions"))
        elif i == 2:
            items.append(("Express 0.000348 in standard scientific form.", ["3.48 × 10⁻⁴", "3.48 × 10⁴", "34.8 × 10⁻⁵", "0.348 × 10⁻³"], 0, "Move the decimal 4 places to the right: 3.48 × 10⁻⁴.", "Standard Form"))
        elif i == 3:
            items.append(("Convert 45 in base ten to a binary numeral (base two).", ["101101₂", "101011₂", "110101₂", "100111₂"], 0, "45 = 32 + 8 + 4 + 1 = 2⁵ + 2³ + 2² + 2⁰ = 101101₂.", "Number Bases"))
        elif i == 4:
            items.append(("Find the Highest Common Factor (HCF) of 36, 54, and 90.", ["18", "9", "6", "3"], 0, "Prime factors: 36=2²×3², 54=2×3³, 90=2×3²×5. Common prime factors with lowest powers: 2¹×3² = 18.", "HCF & LCM"))
        elif i == 5:
            items.append(("Find the Lowest Common Multiple (LCM) of 12, 18, and 30.", ["180", "90", "360", "60"], 0, "12=2²×3, 18=2×3², 30=2×3×5. LCM = 2² × 3² × 5 = 4 × 9 × 5 = 180.", "HCF & LCM"))
        elif i == 6:
            items.append(("Simplify: (2³ × 3⁴) ÷ (2 × 3²).", ["36", "72", "18", "108"], 0, "Apply index laws: 2³⁻¹ × 3⁴⁻² = 2² × 3² = 4 × 9 = 36.", "Indices"))
        elif i == 7:
            items.append(("If 5 men weed a farm in 12 days, how many days will 6 men take working at the same rate?", ["10 days", "15 days", "8 days", "14 days"], 0, "Inverse variation: total man-days = 5 × 12 = 60. For 6 men: 60 ÷ 6 = 10 days.", "Proportion"))
        elif i == 8:
            items.append(("Share GH₵ 7,200 between Kofi and Ama in the ratio 5 : 4. How much does Ama receive?", ["GH₵ 3,200", "GH₵ 4,000", "GH₵ 3,600", "GH₵ 2,800"], 0, "Total ratio parts = 5 + 4 = 9. Ama's share = (4/9) × 7200 = 4 × 800 = GH₵ 3,200.", "Ratio"))
        elif i == 9:
            items.append(("A trader buys a bag of rice for GH₵ 600 and sells it for GH₵ 750. Calculate the percentage profit.", ["25%", "20%", "30%", "15%"], 0, "Profit = 750 - 600 = 150. Profit % = (150/600) × 100% = 25%.", "Commercial Arithmetic"))
        elif i == 10:
            items.append(("Calculate the simple interest on GH₵ 8,000 invested at 15% per annum for 3 years.", ["GH₵ 3,600", "GH₵ 2,400", "GH₵ 1,200", "GH₵ 4,800"], 0, "I = (P × R × T) / 100 = (8000 × 15 × 3) / 100 = 80 × 45 = GH₵ 3,600.", "Commercial Arithmetic"))
        elif i == 11:
            items.append(("Express 35% as a fraction in its lowest terms.", ["7/20", "7/25", "3/10", "1/4"], 0, "35% = 35/100. Divide numerator and denominator by 5: 7/20.", "Percentages"))
        elif i == 12:
            items.append(("Evaluate: 2.4 × 0.05.", ["0.12", "1.2", "0.012", "0.0012"], 0, "24 × 5 = 120. Total decimal digits = 1 + 2 = 3. Hence 0.120 = 0.12.", "Decimals"))
        elif i == 13:
            items.append(("Round 48,765 to the nearest hundred.", ["48,800", "48,700", "49,000", "48,770"], 0, "Tens digit is 6 (≥5), so round the hundreds digit 7 up to 8: 48,800.", "Approximation"))
        elif i == 14:
            items.append(("Evaluate the square root of 0.0144.", ["0.12", "0.012", "1.2", "0.0012"], 0, "√0.0144 = √(144/10000) = 12/100 = 0.12.", "Square Roots"))
        elif i == 15:
            items.append(("If 15% of a certain number is 45, what is the number?", ["300", "250", "450", "600"], 0, "0.15 × x = 45 => x = 45 / 0.15 = 4500 / 15 = 300.", "Percentages"))
        elif i == 16:
            items.append(("Arrange in ascending order: 2/3, 5/8, 3/4.", ["5/8, 2/3, 3/4", "2/3, 5/8, 3/4", "3/4, 2/3, 5/8", "5/8, 3/4, 2/3"], 0, "Express with common denominator 24: 5/8 = 15/24, 2/3 = 16/24, 3/4 = 18/24. Ascending: 5/8, 2/3, 3/4.", "Fractions"))
        elif i == 17:
            items.append(("Solve for n in the base equation: 110₂ + n₂ = 1001₂.", ["11₂", "101₂", "10₂", "111₂"], 0, "1001₂ = 9₁₀, 110₂ = 6₁₀. n = 9 - 6 = 3₁₀ = 11₂.", "Number Bases"))
        elif i == 18:
            items.append(("Find the difference between the square of 13 and the square of 12.", ["25", "1", "169", "144"], 0, "13² - 12² = (13 - 12)(13 + 12) = 1 × 25 = 25.", "Number Theory"))
        elif i == 19:
            items.append(("What is the value of 5⁰ + 5⁻¹ + 5⁻²?", ["1.24", "1.2", "0.25", "1.5"], 0, "1 + 1/5 + 1/25 = 1 + 0.20 + 0.04 = 1.24.", "Indices"))
        elif i == 20:
            items.append(("If universal set U has 50 elements, n(A)=28, n(B)=22, and n(A ∩ B)=8, find n(A ∪ B)'.", ["8", "42", "10", "6"], 0, "n(A ∪ B) = n(A) + n(B) - n(A ∩ B) = 28 + 22 - 8 = 42. n(A ∪ B)' = 50 - 42 = 8.", "Set Theory"))

    # Group 2: Algebra & Equations (21-45)
    for i in range(21, 46):
        k = i - 20
        if k == 1:
            items.append(("Solve for x: 4(x - 3) = 2x + 10.", ["x = 11", "x = 7", "x = 14", "x = 5"], 0, "4x - 12 = 2x + 10 => 2x = 22 => x = 11.", "Algebra"))
        elif k == 2:
            items.append(("Factorize completely: 6a²b - 9ab².", ["3ab(2a - 3b)", "ab(6a - 9b)", "3a(2ab - 3b²)", "3b(2a² - 3ab)"], 0, "The HCF of 6a²b and 9ab² is 3ab. Factor out 3ab: 3ab(2a - 3b).", "Algebra"))
        elif k == 3:
            items.append(("Factorize the quadratic expression: x² - 5x + 6.", ["(x - 2)(x - 3)", "(x - 1)(x - 6)", "(x + 2)(x + 3)", "(x + 1)(x - 6)"], 0, "Find two numbers whose product is 6 and sum is -5: -2 and -3. (x - 2)(x - 3).", "Quadratic Equations"))
        elif k == 4:
            items.append(("Solve the quadratic equation: x² - 9x + 20 = 0.", ["x = 4 or x = 5", "x = -4 or x = -5", "x = 2 or x = 10", "x = 1 or x = 20"], 0, "(x - 4)(x - 5) = 0 => x = 4 or x = 5.", "Quadratic Equations"))
        elif k == 5:
            items.append(("If 3x + 2y = 12 and x - y = 4, find the value of x.", ["x = 4", "x = 2", "x = 5", "x = 0"], 0, "From 2nd equation: y = x - 4. Substitute into 1st: 3x + 2(x - 4) = 12 => 5x - 8 = 12 => 5x = 20 => x = 4.", "Simultaneous Equations"))
        elif k == 6:
            items.append(("Solve the linear inequality: 3(x + 2) ≥ 5x - 4.", ["x ≤ 5", "x ≥ 5", "x ≤ -5", "x ≥ -5"], 0, "3x + 6 ≥ 5x - 4 => 10 ≥ 2x => 2x ≤ 10 => x ≤ 5.", "Inequalities"))
        elif k == 7:
            items.append(("Make 'r' the subject of the formula: V = πr²h.", ["r = √(V / (πh))", "r = V / (πh)", "r = √(Vπh)", "r = (V / πh)²"], 0, "Divide by πh: r² = V / (πh). Take square root: r = √(V / (πh)).", "Change of Subject"))
        elif k == 8:
            items.append(("Expand and simplify: (2x - 3)(x + 4).", ["2x² + 5x - 12", "2x² - 5x - 12", "2x² + 11x - 12", "2x² - 12"], 0, "2x(x) + 2x(4) - 3(x) - 3(4) = 2x² + 8x - 3x - 12 = 2x² + 5x - 12.", "Algebra"))
        elif k == 9:
            items.append(("Find the value of x if 2^(3x - 1) = 32.", ["x = 2", "x = 3", "x = 1", "x = 5"], 0, "32 = 2⁵. Equating indices: 3x - 1 = 5 => 3x = 6 => x = 2.", "Indices"))
        elif k == 10:
            items.append(("If y varies directly as x and y = 18 when x = 6, find y when x = 10.", ["30", "24", "36", "45"], 0, "y = kx. 18 = 6k => k = 3. When x = 10: y = 3 × 10 = 30.", "Variation"))
        elif k == 11:
            items.append(("Solve the equation: (2x + 1)/3 = (x - 2)/2.", ["x = -8", "x = 8", "x = -4", "x = 4"], 0, "Cross-multiply: 2(2x + 1) = 3(x - 2) => 4x + 2 = 3x - 6 => x = -8.", "Algebra"))
        elif k == 12:
            items.append(("Factorize the difference of two squares: 16x² - 49y².", ["(4x - 7y)(4x + 7y)", "(16x - 49y)(x + y)", "(4x - 7y)²", "(4x + 7y)²"], 0, "a² - b² = (a - b)(a + b) with a=4x and b=7y.", "Algebra"))
        elif k == 13:
            items.append(("If f(x) = 2x² - 3x + 5, evaluate f(-2).", ["19", "7", "11", "23"], 0, "f(-2) = 2(-2)² - 3(-2) + 5 = 2(4) + 6 + 5 = 8 + 11 = 19.", "Functions"))
        elif k == 14:
            items.append(("Solve for x: log₂ (x + 6) = 5.", ["26", "32", "10", "16"], 0, "x + 6 = 2⁵ = 32 => x = 32 - 6 = 26.", "Logarithms"))
        elif k == 15:
            items.append(("Find the roots of the equation: 2x² - 8 = 0.", ["x = ±2", "x = 2 only", "x = ±4", "x = 4 only"], 0, "2x² = 8 => x² = 4 => x = ±2.", "Quadratic Equations"))
        elif k == 16:
            items.append(("Simplify: (x² - 4)/(x + 2).", ["x - 2", "x + 2", "x - 4", "x + 4"], 0, "Numerator is (x - 2)(x + 2). Cancel (x + 2): x - 2.", "Algebraic Fractions"))
        elif k == 17:
            items.append(("Find the gradient of the straight line 3x + 4y = 12.", ["-3/4", "3/4", "-4/3", "3"], 0, "Express in y = mx + c: 4y = -3x + 12 => y = (-3/4)x + 3. Gradient m = -3/4.", "Coordinate Geometry"))
        elif k == 18:
            items.append(("Find the equation of a line passing through the origin with slope 5.", ["y = 5x", "y = x + 5", "5y = x", "y = 5"], 0, "Using y = mx + c with m = 5 and c = 0 gives y = 5x.", "Coordinate Geometry"))
        elif k == 19:
            items.append(("Solve: 5 - 2x < 11.", ["x > -3", "x < -3", "x > 3", "x < 3"], 0, "-2x < 6. Dividing by -2 reverses the inequality sign: x > -3.", "Inequalities"))
        elif k == 20:
            items.append(("The sum of three consecutive integers is 72. Find the smallest integer.", ["23", "24", "22", "21"], 0, "n + (n + 1) + (n + 2) = 72 => 3n + 3 = 72 => 3n = 69 => n = 23.", "Word Problems"))
        elif k == 21:
            items.append(("If 1/x + 1/y = 1/z, express z in terms of x and y.", ["z = (xy) / (x + y)", "z = x + y", "z = xy", "z = (x + y) / (xy)"], 0, "1/z = (y + x)/(xy) => z = (xy)/(x + y).", "Change of Subject"))
        elif k == 22:
            items.append(("Find the discriminant of the quadratic equation 2x² - 4x + 1 = 0.", ["8", "16", "24", "-8"], 0, "Discriminant Δ = b² - 4ac = (-4)² - 4(2)(1) = 16 - 8 = 8.", "Quadratic Theory"))
        elif k == 23:
            items.append(("Evaluate log₁₀ (25) + log₁₀ (4).", ["2", "100", "29", "1"], 0, "log₁₀(25 × 4) = log₁₀(100) = 2.", "Logarithms"))
        elif k == 24:
            items.append(("Simplify: (3a³b²)³.", ["27a⁹b⁶", "9a⁶b⁵", "27a⁶b⁵", "9a⁹b⁶"], 0, "3³ × a³ˣ³ × b²ˣ³ = 27a⁹b⁶.", "Indices"))
        elif k == 25:
            items.append(("Find the coordinates of the midpoint between P(2, -4) and Q(6, 8).", ["(4, 2)", "(4, 6)", "(8, 4)", "(2, 4)"], 0, "Midpoint = ((2 + 6)/2, (-4 + 8)/2) = (8/2, 4/2) = (4, 2).", "Coordinate Geometry"))

    # Group 3: Geometry, Mensuration & Trigonometry (46-75)
    for i in range(46, 76):
        k = i - 45
        if k == 1:
            items.append(("Find the area of a circle of radius 7 cm. (Take π = 22/7).", ["154 cm²", "44 cm²", "308 cm²", "77 cm²"], 0, "Area = πr² = (22/7) × 7 × 7 = 154 cm².", "Mensuration"))
        elif k == 2:
            items.append(("Find the perimeter of a sector of a circle of radius 14 cm subtending an angle of 90° at the centre.", ["50 cm", "22 cm", "44 cm", "72 cm"], 0, "Arc length = (90/360) × 2πr = (1/4) × 2 × (22/7) × 14 = 22 cm. Perimeter = Arc + 2r = 22 + 28 = 50 cm.", "Mensuration"))
        elif k == 3:
            items.append(("Calculate the volume of a cylinder with radius 7 cm and height 10 cm. (Take π = 22/7).", ["1,540 cm³", "770 cm³", "440 cm³", "2,200 cm³"], 0, "V = πr²h = (22/7) × 7 × 7 × 10 = 154 × 10 = 1,540 cm³.", "Mensuration"))
        elif k == 4:
            items.append(("The interior angle of a regular polygon is 140°. How many sides does the polygon have?", ["9 sides", "8 sides", "10 sides", "12 sides"], 0, "Exterior angle = 180° - 140° = 40°. Number of sides n = 360° / 40° = 9.", "Polygons"))
        elif k == 5:
            items.append(("Find the hypotenuse of a right-angled triangle with sides 9 cm and 12 cm.", ["15 cm", "21 cm", "18 cm", "13 cm"], 0, "c = √(9² + 12²) = √(81 + 144) = √225 = 15 cm.", "Pythagoras Theorem"))
        elif k == 6:
            items.append(("If tan θ = 4/3 and θ is acute, find the value of sin θ.", ["4/5", "3/5", "5/4", "3/4"], 0, "Opposite = 4, Adjacent = 3. Hypotenuse = √(4² + 3²) = 5. sin θ = Opposite/Hypotenuse = 4/5.", "Trigonometry"))
        elif k == 7:
            items.append(("A ladder 10 m long leans against a vertical wall making an angle of 60° with the ground. How high up the wall does it reach?", ["5√3 m (approx 8.66 m)", "5 m", "10√3 m", "8 m"], 0, "Height = 10 × sin(60°) = 10 × (√3/2) = 5√3 m.", "Trigonometry"))
        elif k == 8:
            items.append(("Calculate the total surface area of a closed cube of side 5 cm.", ["150 cm²", "125 cm²", "100 cm²", "75 cm²"], 0, "A cube has 6 congruent square faces: 6 × 5² = 6 × 25 = 150 cm².", "Mensuration"))
        elif k == 9:
            items.append(("Find the distance between the points A(1, 2) and B(4, 6).", ["5 units", "7 units", "25 units", "√7 units"], 0, "d = √((4 - 1)² + (6 - 2)²) = √(3² + 4²) = √(9 + 16) = √25 = 5 units.", "Coordinate Geometry"))
        elif k == 10:
            items.append(("Two angles are complementary. If one angle is 38°, find the other angle.", ["52°", "142°", "62°", "42°"], 0, "Complementary angles sum to 90°. Other angle = 90° - 38° = 52°.", "Angles"))
        elif k == 11:
            items.append(("Two angles are supplementary. If one angle is 115°, what is the measure of the other angle?", ["65°", "75°", "25°", "85°"], 0, "Supplementary angles sum to 180°. Other angle = 180° - 115° = 65°.", "Angles"))
        elif k == 12:
            items.append(("Find the area of a trapezium with parallel sides 8 cm and 12 cm, and vertical height 6 cm.", ["60 cm²", "120 cm²", "48 cm²", "72 cm²"], 0, "Area = 1/2 × (a + b) × h = 1/2 × (8 + 12) × 6 = 1/2 × 20 × 6 = 60 cm².", "Mensuration"))
        elif k == 13:
            items.append(("In a circle, an angle subtended by a diameter at the circumference is always:", ["90° (Right angle)", "60°", "180°", "45°"], 0, "Thales's theorem: the angle in a semicircle subtended by a diameter is 90°.", "Circle Theorems"))
        elif k == 14:
            items.append(("The angle at the centre of a circle is 80°. What is the angle subtended by the same arc at the circumference?", ["40°", "160°", "80°", "20°"], 0, "The angle subtended at the centre is twice the angle subtended at the circumference: 80° / 2 = 40°.", "Circle Theorems"))
        elif k == 15:
            items.append(("Find the sum of the interior angles of a hexagon (6-sided polygon).", ["720°", "540°", "360°", "900°"], 0, "Sum = (n - 2) × 180° = (6 - 2) × 180° = 4 × 180° = 720°.", "Polygons"))
        elif k == 16:
            items.append(("Calculate the volume of a sphere of radius 3 cm. (Leave in terms of π).", ["36π cm³", "12π cm³", "18π cm³", "27π cm³"], 0, "V = (4/3)πr³ = (4/3) × π × 27 = 36π cm³.", "Mensuration"))
        elif k == 17:
            items.append(("A bearing of 225° can be written in compass bearing notation as:", ["S 45° W", "S 45° E", "N 45° W", "W 45° S"], 0, "225° is in the third quadrant: 225° - 180° = 45° West of South, i.e., S 45° W.", "Bearings"))
        elif k == 18:
            items.append(("In triangle ABC, angle A = 65° and angle B = 45°. Find the measure of angle C.", ["70°", "80°", "60°", "55°"], 0, "Angles in a triangle sum to 180°: 180° - (65° + 45°) = 180° - 110° = 70°.", "Triangles"))
        elif k == 19:
            items.append(("Find the perimeter of an equilateral triangle with side length 8.5 cm.", ["25.5 cm", "17.0 cm", "24.0 cm", "34.0 cm"], 0, "An equilateral triangle has 3 equal sides: 3 × 8.5 = 25.5 cm.", "Mensuration"))
        elif k == 20:
            items.append(("If cos θ = 1/2 for an acute angle θ, what is the value of θ?", ["60°", "30°", "45°", "90°"], 0, "cos(60°) = 1/2.", "Trigonometry"))
        elif k == 21:
            items.append(("Calculate the length of the diagonal of a square with side length 6 cm.", ["6√2 cm", "12 cm", "6 cm", "36 cm"], 0, "d = √(6² + 6²) = √(72) = 6√2 cm.", "Pythagoras Theorem"))
        elif k == 22:
            items.append(("What is the total curved surface area of a cone with radius 7 cm and slant height 25 cm? (Take π = 22/7).", ["550 cm²", "175 cm²", "350 cm²", "700 cm²"], 0, "Curved surface area = πrl = (22/7) × 7 × 25 = 550 cm².", "Mensuration"))
        elif k == 23:
            items.append(("Find the area of an isosceles right-angled triangle with equal legs of length 10 cm.", ["50 cm²", "100 cm²", "25 cm²", "200 cm²"], 0, "Area = 1/2 × base × height = 1/2 × 10 × 10 = 50 cm².", "Mensuration"))
        elif k == 24:
            items.append(("In an isosceles triangle, the vertex angle is 40°. What is the measure of each base angle?", ["70°", "80°", "60°", "140°"], 0, "Base angles are equal: (180° - 40°) / 2 = 140° / 2 = 70°.", "Triangles"))
        elif k == 25:
            items.append(("The angle of depression of a boat from the top of a cliff 50 m high is 30°. Find the horizontal distance to the boat.", ["50√3 m (approx 86.6 m)", "50 m", "25 m", "100 m"], 0, "tan(30°) = opposite/adjacent => 1/√3 = 50 / d => d = 50√3 m.", "Trigonometry"))
        elif k == 26:
            items.append(("What is the magnitude of the vector u = (6, -8)?", ["10 units", "14 units", "2 units", "√28 units"], 0, "|u| = √(6² + (-8)²) = √(36 + 64) = √100 = 10 units.", "Vectors"))
        elif k == 27:
            items.append(("Find the sum of the vectors a = (3, 5) and b = (-1, 2).", ["(2, 7)", "(4, 3)", "(-3, 10)", "(2, 3)"], 0, "a + b = (3 + (-1), 5 + 2) = (2, 7).", "Vectors"))
        elif k == 28:
            items.append(("If point P(3, 4) is reflected in the x-axis, what are the coordinates of its image?", ["(3, -4)", "(-3, 4)", "(-3, -4)", "(4, 3)"], 0, "Reflection in the x-axis keeps the x-coordinate unchanged and negates y: (3, -4).", "Transformations"))
        elif k == 29:
            items.append(("If point Q(-2, 5) is reflected in the y-axis, what are the coordinates of its image?", ["(2, 5)", "(-2, -5)", "(5, -2)", "(2, -5)"], 0, "Reflection in the y-axis negates x and preserves y: (2, 5).", "Transformations"))
        elif k == 30:
            items.append(("Under a translation by vector T = (4, -3), point A(1, 2) is mapped to:", ["(5, -1)", "(5, 5)", "(-3, 5)", "(4, -1)"], 0, "Image = (1 + 4, 2 + (-3)) = (5, -1).", "Transformations"))

    # Group 4: Statistics & Probability (76-100)
    for i in range(76, 101):
        k = i - 75
        if k == 1:
            items.append(("Find the mean of the numbers: 6, 8, 12, 14, 20.", ["12", "14", "10", "15"], 0, "Mean = (6 + 8 + 12 + 14 + 20) / 5 = 60 / 5 = 12.", "Statistics"))
        elif k == 2:
            items.append(("Find the median of the set: 15, 7, 22, 13, 9, 18, 11.", ["13", "15", "11", "14"], 0, "Arrange in order: 7, 9, 11, 13, 15, 18, 22. The 4th middle value is 13.", "Statistics"))
        elif k == 3:
            items.append(("Find the mode of the distribution: 4, 7, 9, 7, 3, 7, 4, 8.", ["7", "4", "9", "3"], 0, "The number 7 appears most frequently (3 times).", "Statistics"))
        elif k == 4:
            items.append(("Find the range of the test scores: 42, 68, 89, 54, 73, 95, 31.", ["64", "95", "31", "54"], 0, "Range = Maximum - Minimum = 95 - 31 = 64.", "Statistics"))
        elif k == 5:
            items.append(("A fair six-sided die is rolled once. What is the probability of obtaining a prime number?", ["1/2", "1/3", "1/6", "2/3"], 0, "Prime outcomes on a die are {2, 3, 5} (3 favorable outcomes out of 6): 3/6 = 1/2.", "Probability"))
        elif k == 6:
            items.append(("A bag contains 5 red balls, 4 blue balls, and 3 green balls. A ball is drawn at random. Find the probability that it is blue.", ["1/3", "1/4", "5/12", "1/2"], 0, "Total balls = 5 + 4 + 3 = 12. P(Blue) = 4/12 = 1/3.", "Probability"))
        elif k == 7:
            items.append(("Two fair coins are tossed simultaneously. What is the probability of getting at least one head?", ["3/4", "1/2", "1/4", "1"], 0, "Outcomes: {HH, HT, TH, TT} (4 equally likely outcomes). At least one head: {HH, HT, TH} = 3/4.", "Probability"))
        elif k == 8:
            items.append(("In a class of 40 students, 24 are girls. What is the probability of selecting a boy at random?", ["2/5", "3/5", "1/4", "1/2"], 0, "Number of boys = 40 - 24 = 16. P(Boy) = 16/40 = 2/5.", "Probability"))
        elif k == 9:
            items.append(("Find the mean of the first five prime numbers.", ["5.6", "5.0", "6.2", "7.0"], 0, "First 5 primes: 2, 3, 5, 7, 11. Sum = 28. Mean = 28 / 5 = 5.6.", "Statistics"))
        elif k == 10:
            items.append(("If the mean of 4, 8, x, 14, and 16 is 11, find x.", ["13", "12", "11", "15"], 0, "Sum = 4 + 8 + x + 14 + 16 = 42 + x. 42 + x = 5 × 11 = 55 => x = 55 - 42 = 13.", "Statistics"))
        elif k == 11:
            items.append(("In a pie chart, an expenditure of GH₵ 300 out of a total budget of GH₵ 1,200 is represented by an angle of:", ["90°", "60°", "120°", "45°"], 0, "Angle = (300 / 1200) × 360° = (1/4) × 360° = 90°.", "Pie Charts"))
        elif k == 12:
            items.append(("A card is drawn from a standard deck of 52 playing cards. What is the probability of drawing an Ace?", ["1/13", "1/52", "1/4", "4/13"], 0, "There are 4 Aces in 52 cards: P(Ace) = 4/52 = 1/13.", "Probability"))
        elif k == 13:
            items.append(("What is the median of the even numbers between 5 and 19?", ["12", "10", "14", "11"], 0, "Even numbers: 6, 8, 10, 12, 14, 16, 18 (7 values). The middle term is 12.", "Statistics"))
        elif k == 14:
            items.append(("If P(A) = 0.35, what is the probability of the complement of A, P(A')?", ["0.65", "0.35", "1.00", "0.75"], 0, "P(A') = 1 - P(A) = 1 - 0.35 = 0.65.", "Probability"))
        elif k == 15:
            items.append(("The scores of 6 students in a test are 5, 7, 8, 8, 9, 11. Find the interquartile range (IQR).", ["2.0", "3.0", "4.0", "1.5"], 0, "Lower half: 5, 7, 8 => Q1 = 7. Upper half: 8, 9, 11 => Q3 = 9. IQR = Q3 - Q1 = 9 - 7 = 2.", "Statistics"))
        elif k == 16:
            items.append(("A letter is chosen at random from the word 'MATHEMATICS'. What is the probability that it is a vowel?", ["4/11", "7/11", "3/11", "5/11"], 0, "Letters in MATHEMATICS = 11. Vowels are A, E, A, I (4 vowels). P(Vowel) = 4/11.", "Probability"))
        elif k == 17:
            items.append(("Find the modal class of the frequency distribution: 1-5 (freq 4), 6-10 (freq 9), 11-15 (freq 14), 16-20 (freq 8).", ["11 - 15", "6 - 10", "16 - 20", "1 - 5"], 0, "The modal class is the interval with the highest frequency (14), which is 11 - 15.", "Statistics"))
        elif k == 18:
            items.append(("What is the probability of picking an odd number from the integers 1 to 20 inclusive?", ["1/2", "9/20", "11/20", "1/4"], 0, "There are 10 odd numbers out of 20: 10/20 = 1/2.", "Probability"))
        elif k == 19:
            items.append(("A number is chosen at random from {1, 2, 3, ..., 30}. What is the probability that it is a multiple of 5?", ["1/5", "1/6", "3/10", "1/3"], 0, "Multiples of 5 up to 30: {5, 10, 15, 20, 25, 30} (6 numbers). P = 6/30 = 1/5.", "Probability"))
        elif k == 20:
            items.append(("The mean age of 4 boys is 12 years. When a fifth boy joins, the mean age becomes 13 years. How old is the fifth boy?", ["17 years", "16 years", "15 years", "14 years"], 0, "Initial total age = 4 × 12 = 48. New total age = 5 × 13 = 65. Fifth boy's age = 65 - 48 = 17 years.", "Statistics"))
        elif k == 21:
            items.append(("A sector of a pie chart representing agriculture has an angle of 108°. What percentage of the whole activity is agriculture?", ["30%", "25%", "35%", "20%"], 0, "Percentage = (108° / 360°) × 100% = 0.30 × 100% = 30%.", "Pie Charts"))
        elif k == 22:
            items.append(("Two fair dice are rolled together. What is the probability of rolling a sum of 7?", ["1/6", "1/12", "7/36", "5/36"], 0, "Combinations giving sum 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1) = 6 out of 36. 6/36 = 1/6.", "Probability"))
        elif k == 23:
            items.append(("Find the variance of the numbers 2, 4, 6.", ["2.67", "4.0", "1.63", "8.0"], 0, "Mean = 4. Deviations squared: (2-4)²=4, (4-4)²=0, (6-4)²=4. Variance = (4+0+4)/3 = 8/3 ≈ 2.67.", "Statistics"))
        elif k == 24:
            items.append(("If events A and B are mutually exclusive, then P(A ∩ B) is equal to:", ["0", "P(A) × P(B)", "1", "P(A) + P(B)"], 0, "Mutually exclusive events cannot occur simultaneously, so their intersection is the empty set: P(A ∩ B) = 0.", "Probability"))
        elif k == 25:
            items.append(("A container has 6 black pens and 4 red pens. If two pens are drawn without replacement, find the probability that both are black.", ["1/3", "9/25", "2/5", "1/2"], 0, "First draw: 6/10. Second draw: 5/9. P(Both Black) = (6/10) × (5/9) = 30/90 = 1/3.", "Probability"))

    questions = []
    for idx, item in enumerate(items):
        questions.append({
            "id": f"{subject_id}-2027-{idx+1:03d}",
            "releaseYear": "2027",
            "examFamily": exam_family,
            "subjectId": subject_id,
            "topic": item[4],
            "syllabusRef": f"WAEC / NaCCA Mathematics Syllabus - {item[4]} Obj {idx+1}",
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

print("Distinct Math generator defined.")
