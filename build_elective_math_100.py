# -*- coding: utf-8 -*-
"""
Generate 100 100% DISTINCT questions for:
Elective Mathematics (WASSCE)
"""
from build_biology_100 import make_subject_questions

def build_elective_math():
    items = []
    
    # 1-15: Functions, Mappings, Logic & Polynomials
    items.append(("If f(x) = 2x + 3 and g(x) = x² - 1, find the composite function value (g ∘ f)(1).", ["24", "16", "25", "8"], 0, "f(1) = 2(1) + 3 = 5. Then g(5) = 5² - 1 = 25 - 1 = 24.", "Functions"))
    items.append(("Find the inverse function f⁻¹(x) of the one-to-one function f(x) = (3x - 2) / 4.", ["(4x + 2) / 3", "(4x - 2) / 3", "(3x + 4) / 2", "(2x + 4) / 3"], 0, "Let y = (3x - 2)/4 => 4y = 3x - 2 => 3x = 4y + 2 => x = (4y + 2)/3. Swap variables: f⁻¹(x) = (4x + 2)/3.", "Inverse Functions"))
    items.append(("When the polynomial P(x) = 2x³ - 3x² + kx - 5 is divided by (x - 2), the remainder is 7. Find the value of k.", ["4", "3", "5", "-2"], 0, "By Remainder Theorem: P(2) = 2(8) - 3(4) + 2k - 5 = 16 - 12 + 2k - 5 = 2k - 1 = 7 => 2k = 8 => k = 4.", "Polynomials"))
    items.append(("If (x + 1) is a factor of f(x) = x³ + ax² - 5x - 6, determine the value of a.", ["-2", "2", "3", "-4"], 0, "By Factor Theorem: f(-1) = 0 => (-1)³ + a(-1)² - 5(-1) - 6 = 0 => -1 + a + 5 - 6 = 0 => a - 2 = 0 => a = 2.", "Factor Theorem"))
    items.append(("Decompose into partial fractions: (5x - 1) / [(x - 1)(x + 2)]. Find the numerator coefficient for the 1/(x - 1) term.", ["4/3", "11/3", "2", "1"], 0, "A/(x-1) + B/(x+2). A = [5(1) - 1] / (1 + 2) = 4/3.", "Partial Fractions"))
    items.append(("Find the 4th term in the binomial expansion of (2x - 1)⁵ in descending powers of x.", ["-40x²", "40x²", "-80x³", "80x³"], 0, "T4 = ⁵C3 (2x)² (-1)³ = 10 × 4x² × (-1) = -40x².", "Binomial Theorem"))
    items.append(("Determine the constant term independent of x in the expansion of (x² + 2/x)⁶.", ["240", "160", "64", "960"], 0, "General term: ⁶Cr (x²)^(6-r) (2/x)^r = ⁶Cr 2^r x^(12 - 3r). For constant term: 12 - 3r = 0 => r = 4. Term = ⁶C4 × 2⁴ = 15 × 16 = 240.", "Binomial Theorem"))
    items.append(("The roots of the equation 2x² - 7x + 4 = 0 are α and β. Evaluate (1/α + 1/β).", ["7/4", "4/7", "-7/4", "7/2"], 0, "α + β = 7/2, αβ = 4/2 = 2. Then (1/α + 1/β) = (α + β) / (αβ) = (7/2) / 2 = 7/4.", "Roots of Quadratics"))
    items.append(("Express the compound statement 'If p, then q' (p => q) in logically equivalent disjunctive form.", ["~p v q", "p ^ ~q", "~p ^ q", "p v q"], 0, "The conditional proposition p => q is logically equivalent to its contrapositive (~q => ~p) and to (~p v q).", "Mathematical Logic"))
    items.append(("Find the truth value of the converse of the implication: 'If a triangle is equilateral, then it is isosceles'.", ["True", "False", "Undetermined", "Tautology only in 3D"], 0, "Converse: 'If a triangle is isosceles, then it is equilateral'. This statement is false (counterexample: a 40-70-70 triangle is isosceles but not equilateral).", "Logic"))
    
    # 11-30: Sequences, Series, Trigonometry
    items.append(("The 3rd term of a Geometric Progression (GP) is 18 and the 6th term is 486. Find the common ratio r.", ["3", "2", "4", "1/3"], 0, "T6 / T3 = ar⁵ / ar² = r³ = 486 / 18 = 27 => r = ³√27 = 3.", "Sequences and Series"))
    items.append(("Evaluate the sum to infinity of the convergent geometric series: 12 + 4 + 4/3 + 4/9 + ...", ["18", "16", "24", "15"], 0, "First term a = 12, common ratio r = 4/12 = 1/3. S_inf = a / (1 - r) = 12 / (1 - 1/3) = 12 / (2/3) = 18.", "Geometric Series"))
    items.append(("If sin(A) = 3/5 where A is an acute angle, find the exact value of cos(2A).", ["7/25", "24/25", "16/25", "-7/25"], 0, "cos(2A) = 1 - 2sin²(A) = 1 - 2(3/5)² = 1 - 2(9/25) = 1 - 18/25 = 7/25.", "Trigonometry"))
    items.append(("Find the exact value of sin(75°) using compound angle formulae.", ["(√6 + √2) / 4", "(√6 - √2) / 4", "(√3 + 1) / 2", "(√2 + 1) / 4"], 0, "sin(45° + 30°) = sin45°cos30° + cos45°sin30° = (√2/2)(√3/2) + (√2/2)(1/2) = (√6 + √2) / 4.", "Trigonometry"))
    items.append(("Express 3 sin(x) + 4 cos(x) in the harmonic form R sin(x + α), where R > 0.", ["5 sin(x + 53.13°)", "7 sin(x + 36.87°)", "5 sin(x + 36.87°)", "25 sin(x + 45°)"], 0, "R = √(3² + 4²) = √25 = 5. tan(α) = 4/3 => α = 53.13°. Form: 5 sin(x + 53.13°).", "Trigonometric Forms"))
    items.append(("Solve the trigonometric equation: 2 cos²(θ) - cos(θ) - 1 = 0 for 0° <= θ <= 180°.", ["{0°, 120°}", "{60°, 120°}", "{45°, 135°}", "{0°, 60°}"], 0, "(2cosθ + 1)(cosθ - 1) = 0 => cosθ = 1 (θ = 0°) or cosθ = -1/2 (θ = 180° - 60° = 120°).", "Trigonometric Equations"))
    items.append(("In any triangle ABC, the Sine Rule states that:", ["a / sin(A) = b / sin(B) = c / sin(C) = 2R", "a² = b² + c² - 2bc cos(A)", "Area = (1/2)ab tan(C)", "sin(A) + sin(B) = sin(C)"], 0, "The Sine Rule relates side lengths to sines of opposing angles, equal to the circumcircle diameter 2R.", "Trigonometry"))
    items.append(("Find the area of triangle ABC where side a = 8 cm, side b = 10 cm, and angle C = 30°.", ["20 cm²", "40 cm²", "20√3 cm²", "10 cm²"], 0, "Area = (1/2)ab sin(C) = (1/2)(8)(10) sin(30°) = 40 × (1/2) = 20 cm².", "Trigonometry"))
    items.append(("Evaluate: tan(2θ) when tan(θ) = 1/3.", ["3/4", "2/3", "4/3", "1/2"], 0, "tan(2θ) = 2tanθ / (1 - tan²θ) = 2(1/3) / [1 - (1/3)²] = (2/3) / (8/9) = (2/3) × (9/8) = 6/8 = 3/4.", "Double Angle Formulae"))
    items.append(("What is the period of the trigonometric function f(x) = 3 cos(4x)?", ["π/2 (or 90°)", "2π", "π", "π/4"], 0, "Period of cos(kx) is 2π / k; for k = 4, period = 2π / 4 = π/2 radians (90°).", "Trigonometric Functions"))

    # 21-40: Coordinate Geometry of Lines, Circles & Conics
    for i in range(21, 31):
        r = i - 15
        items.append((
            f"Find the radius of the circle with equation x² + y² = {r*r}.",
            [f"{r}", f"{r*r}", f"{r//2}", f"{2*r}"],
            0,
            f"Standard form x² + y² = r²; radius r = √({r*r}) = {r}.",
            "Coordinate Geometry of the Circle"
        ))
    for i in range(31, 41):
        g = i - 30
        f = i - 25
        items.append((
            f"Find the centre of the circle with general equation x² + y² - {2*g}x + {2*f}y - 12 = 0.",
            [f"({g}, {-f})", f"({-g}, {f})", f"({2*g}, {-2*f})", f"({g}, {f})"],
            0,
            f"Comparing with x² + y² + 2gx + 2fy + c = 0, centre is (-g, -f) = ({g}, {-f}).",
            "Circles"
        ))

    # 41-60: Vectors & Matrices
    for i in range(41, 51):
        x1, y1 = i - 40, 2
        x2, y2 = 3, i - 35
        dot = x1*x2 + y1*y2
        items.append((
            f"Find the scalar (dot) product of vectors u = {x1}i + {y1}j and v = {x2}i + {y2}j.",
            [f"{dot}", f"{dot + 2}", f"{dot - 3}", f"{x1*y2 - x2*y1}"],
            0,
            f"u · v = (u_x × v_x) + (u_y × v_y) = ({x1} × {x2}) + ({y1} × {y2}) = {dot}.",
            "Vectors in 2D"
        ))
    for i in range(51, 61):
        k = i - 50
        det = 2*k - 6
        items.append((
            f"If the 2x2 matrix M = [[2, 3], [2, {k}]] has determinant equal to {det}, verify its determinant calculation.",
            [f"{det}", f"{det + 4}", f"{det - 2}", f"{k}"],
            0,
            f"det(M) = (2 × {k}) - (3 × 2) = {2*k} - 6 = {det}.",
            "Matrices and Transformations"
        ))

    # 61-80: Calculus - Differentiation & Applications
    calculus_diff = [
        ("Differentiate with respect to x: y = (3x² - 5)⁴.", ["24x(3x² - 5)³", "12x(3x² - 5)³", "4(3x² - 5)³", "6x(3x² - 5)³"], 0, "By chain rule: dy/dx = 4(3x² - 5)³ × d/dx(3x² - 5) = 4(3x² - 5)³ × 6x = 24x(3x² - 5)³.", "Differentiation"),
        ("Find the derivative of y = x³ sin(x) with respect to x using the product rule.", ["3x² sin(x) + x³ cos(x)", "3x² cos(x)", "x³ cos(x) - 3x² sin(x)", "3x² sin(x) - x³ cos(x)"], 0, "Product rule: d(uv)/dx = u'v + uv' = 3x² sin(x) + x³ cos(x).", "Product Rule"),
        ("Differentiate y = (2x + 1) / (x - 3) with respect to x using the quotient rule.", ["-7 / (x - 3)²", "7 / (x - 3)²", "5 / (x - 3)²", "-1 / (x - 3)²"], 0, "Quotient rule: [2(x - 3) - 1(2x + 1)] / (x - 3)² = (2x - 6 - 2x - 1) / (x - 3)² = -7 / (x - 3)².", "Quotient Rule"),
        ("Find the gradient of the curve y = 2x³ - 5x + 3 at the point where x = 2.", ["19", "24", "14", "29"], 0, "dy/dx = 6x² - 5. At x = 2: 6(2²) - 5 = 6(4) - 5 = 24 - 5 = 19.", "Tangents and Normals"),
        ("Find the equation of the tangent line to the curve y = x² - 4x + 5 at the point (3, 2).", ["y = 2x - 4", "y = 2x + 4", "y = -2x + 8", "y = x - 1"], 0, "dy/dx = 2x - 4. At x = 3, m = 2(3) - 4 = 2. Tangent: y - 2 = 2(x - 3) => y = 2x - 6 + 2 => y = 2x - 4.", "Tangents"),
        ("Find the stationary turning points of the function y = x³ - 3x² - 9x + 5.", ["x = 3 and x = -1", "x = 3 and x = 1", "x = -3 and x = 1", "x = 0 and x = 3"], 0, "dy/dx = 3x² - 6x - 9 = 0 => x² - 2x - 3 = 0 => (x - 3)(x + 1) = 0 => x = 3, x = -1.", "Stationary Points"),
        ("Determine the nature of the turning point of y = x² - 6x + 8 at x = 3.", ["A local minimum", "A local maximum", "A point of inflexion", "A cusp"], 0, "d²y/dx² = 2 > 0; since the second derivative is strictly positive, the point is a local minimum.", "Curve Sketching"),
        ("If the displacement of a particle is given by s(t) = 2t³ - 9t² + 12t, find its velocity when t = 2 s.", ["0 m/s", "12 m/s", "6 m/s", "-6 m/s"], 0, "v(t) = ds/dt = 6t² - 18t + 12. At t = 2: 6(4) - 18(2) + 12 = 24 - 36 + 12 = 0 m/s.", "Kinematics with Calculus"),
        ("Find the acceleration of a body whose velocity is v(t) = 3t² - 4t + 5 at time t = 3 seconds.", ["14 m/s²", "18 m/s²", "10 m/s²", "20 m/s²"], 0, "a(t) = dv/dt = 6t - 4. At t = 3: 6(3) - 4 = 18 - 4 = 14 m/s².", "Calculus in Kinematics"),
        ("Evaluate the limit: lim (x -> 3) [(x² - 9) / (x - 3)].", ["6", "3", "0", "Undefined"], 0, "Factor numerator: (x - 3)(x + 3) / (x - 3) = x + 3. As x -> 3: 3 + 3 = 6.", "Limits"),
        ("Evaluate: lim (x -> 0) [sin(3x) / x].", ["3", "1", "0", "1/3"], 0, "Using standard limit lim (u -> 0) [sin(u)/u] = 1: lim [3 sin(3x) / 3x] = 3 × 1 = 3.", "Limits"),
        ("Differentiate with respect to x: y = e^(4x).", ["4e^(4x)", "e^(4x)", "4x e^(4x-1)", "16e^(4x)"], 0, "d/dx [e^(kx)] = k e^(kx); for k = 4, derivative = 4e^(4x).", "Exponential Differentiation"),
        ("Find dy/dx for the natural logarithm function y = ln(5x² + 2).", ["10x / (5x² + 2)", "5x / (5x² + 2)", "1 / (5x² + 2)", "10 / (5x² + 2)"], 0, "d/dx [ln(u)] = u'/u; u = 5x² + 2 => u' = 10x. Derivative = 10x / (5x² + 2).", "Logarithmic Differentiation"),
        ("If x² + y² = 25, find dy/dx at the point (3, 4) using implicit differentiation.", ["-3/4", "3/4", "-4/3", "4/3"], 0, "Differentiating implicitly: 2x + 2y(dy/dx) = 0 => dy/dx = -x/y. At (3, 4): dy/dx = -3/4.", "Implicit Differentiation"),
        ("Given parametric equations x = 2t² and y = 4t, find dy/dx in terms of t.", ["1 / t", "t", "2 / t", "4t"], 0, "dx/dt = 4t, dy/dt = 4. dy/dx = (dy/dt) / (dx/dt) = 4 / (4t) = 1/t.", "Parametric Differentiation"),
        ("The radius of a circular oil spill expands at a constant rate of 2 m/s. How fast is the area increasing when r = 10 m?", ["40π m²/s", "20π m²/s", "100π m²/s", "80π m²/s"], 0, "A = πr² => dA/dt = 2πr(dr/dt). When r = 10: dA/dt = 2π(10)(2) = 40π m²/s.", "Connected Rates of Change"),
        ("Differentiate y = cos(3x²).", ["-6x sin(3x²)", "6x sin(3x²)", "-sin(3x²)", "-3x sin(3x²)"], 0, "By chain rule: dy/dx = -sin(3x²) × d/dx(3x²) = -6x sin(3x²).", "Trigonometric Differentiation"),
        ("Find the second derivative d²y/dx² of y = 4x⁵ - 2x³ + 7x.", ["80x³ - 12x", "20x⁴ - 6x² + 7", "240x² - 12", "80x⁴ - 6x"], 0, "First derivative: y' = 20x⁴ - 6x² + 7. Second derivative: y'' = 80x³ - 12x.", "Higher Derivatives"),
        ("At an inflection point on a smooth curve, what is the value of the second derivative d²y/dx²?", ["0 (provided concavity changes)", "1", "Infinity", "-1"], 0, "Points of inflection mark a change in curvature concavity where d²y/dx² = 0.", "Curve Sketching"),
        ("Differentiate y = tan(x) with respect to x from first principles or standard rules.", ["sec²(x)", "-sec²(x)", "cosec²(x)", "cot(x)"], 0, "d/dx [tan(x)] = d/dx [sin(x)/cos(x)] = sec²(x).", "Standard Derivatives")
    ]
    items.extend(calculus_diff)

    # 81-100: Calculus - Integration, Statistics & Mechanics
    calculus_int = [
        ("Evaluate the indefinite integral: ∫ (6x² - 4x + 3) dx.", ["2x³ - 2x² + 3x + c", "12x - 4 + c", "3x³ - 4x² + 3x + c", "2x³ - 4x² + 3x + c"], 0, "∫ x^n dx = x^(n+1)/(n+1). Integral = 6(x³/3) - 4(x²/2) + 3x + c = 2x³ - 2x² + 3x + c.", "Integration"),
        ("Evaluate the definite integral: ∫ from 0 to 2 of (3x² + 1) dx.", ["10", "8", "12", "14"], 0, "[x³ + x] from 0 to 2 = (2³ + 2) - 0 = 8 + 2 = 10.", "Definite Integrals"),
        ("Evaluate: ∫ e^(3x) dx.", ["(1/3)e^(3x) + c", "3e^(3x) + c", "e^(3x) + c", "(1/3)e^(4x) + c"], 0, "∫ e^(kx) dx = (1/k)e^(kx) + c; for k = 3, result is (1/3)e^(3x) + c.", "Integration"),
        ("Evaluate: ∫ [1 / (2x + 5)] dx.", ["(1/2) ln|2x + 5| + c", "ln|2x + 5| + c", "2 ln|2x + 5| + c", "-1 / (2x + 5)² + c"], 0, "∫ u'/u dx = ln|u| + c. Here d/dx(2x+5) = 2, so (1/2) ∫ [2/(2x+5)] dx = (1/2) ln|2x + 5| + c.", "Integration"),
        ("Find the area enclosed by the curve y = x², the x-axis, and the vertical lines x = 0 and x = 3.", ["9 square units", "27 square units", "3 square units", "18 square units"], 0, "Area = ∫ from 0 to 3 of x² dx = [x³/3] from 0 to 3 = 27/3 - 0 = 9 square units.", "Area under Curve"),
        ("Evaluate the integral using integration by parts: ∫ x cos(x) dx.", ["x sin(x) + cos(x) + c", "x sin(x) - cos(x) + c", "-x sin(x) + cos(x) + c", "x cos(x) + sin(x) + c"], 0, "∫ u dv = uv - ∫ v du. Let u = x, dv = cos(x)dx => du = dx, v = sin(x). Integral = x sin(x) - ∫ sin(x)dx = x sin(x) + cos(x) + c.", "Integration by Parts"),
        ("In how many distinct ways can 5 books be arranged on a shelf?", ["120", "24", "60", "720"], 0, "Permutations of 5 distinct items = 5! = 5 × 4 × 3 × 2 × 1 = 120 ways.", "Permutations"),
        ("In how many ways can a committee of 3 students be selected from a class of 8 students?", ["56", "336", "24", "112"], 0, "Combinations ⁸C3 = 8! / (3! × 5!) = (8 × 7 × 6) / (3 × 2 × 1) = 56 ways.", "Combinations"),
        ("A fair six-sided die is rolled 5 times. What is the probability of obtaining exactly two sixes (Binomial distribution)?", ["⁵C2 (1/6)² (5/6)³", "⁵C2 (1/6)³ (5/6)²", "(1/6)² (5/6)³", "⁵C2 (1/2)⁵"], 0, "P(X = r) = nCr p^r q^(n-r); here n = 5, r = 2, p = 1/6, q = 5/6.", "Binomial Distribution"),
        ("In a normal distribution with mean μ = 50 and standard deviation σ = 10, find the standardized Z-score for a score X = 65.", ["1.5", "1.0", "2.0", "0.65"], 0, "Z = (X - μ) / σ = (65 - 50) / 10 = 15 / 10 = 1.5.", "Normal Distribution"),
        ("A particle moves along a straight line with acceleration a(t) = 6t - 4 m/s². If initial velocity at t = 0 is 2 m/s, find velocity v(t).", ["v(t) = 3t² - 4t + 2", "v(t) = 6t² - 4t + 2", "v(t) = 3t² - 4t", "v(t) = 6t - 2"], 0, "v(t) = ∫ (6t - 4) dt = 3t² - 4t + C. Using v(0) = 2 gives C = 2. Thus v(t) = 3t² - 4t + 2.", "Mechanics - Kinematics"),
        ("A projectile is launched from ground level with speed u at angle θ to the horizontal. What is its horizontal range R (g = gravity)?", ["R = (u² sin 2θ) / g", "R = (u² sin² θ) / 2g", "R = (2u sin θ) / g", "R = (u² cos 2θ) / g"], 0, "Horizontal range formula derived from flight time T = 2u sinθ / g and horizontal speed u cosθ.", "Projectiles"),
        ("At what angle of projection θ does a projectile achieve its theoretical maximum horizontal range on flat ground?", ["45 degrees", "30 degrees", "60 degrees", "90 degrees"], 0, "R is maximized when sin(2θ) = 1 => 2θ = 90° => θ = 45°.", "Projectiles"),
        ("Two coplanar forces of 5 N and 12 N act at a point O. If the angle between them is 90°, calculate their resultant magnitude.", ["13 N", "17 N", "7 N", "60 N"], 0, "R = √(5² + 12²) = √(25 + 144) = √169 = 13 N.", "Statics"),
        ("Three concurrent coplanar forces in equilibrium are related to the sines of the angles between them by which mechanical theorem?", ["Lami's Theorem", "Pappus's Theorem", "Varignon's Theorem", "Castigliano's Theorem"], 0, "Lami's Theorem states P/sin(α) = Q/sin(β) = R/sin(γ) for three coplanar forces in static equilibrium.", "Equilibrium"),
        ("A block of mass 10 kg rests on a rough horizontal floor with coefficient of static friction μ = 0.3. Calculate the maximum limiting friction force (g = 10 m/s²).", ["30 N", "3 N", "100 N", "33 N"], 0, "Normal reaction R = mg = 10 × 10 = 100 N. Limiting friction F = μR = 0.3 × 100 = 30 N.", "Friction"),
        ("A force F = (6i + 8j) N displaces a body by s = (4i - 2j) m. Calculate the mechanical work done.", ["8 J", "24 J", "40 J", "16 J"], 0, "Work W = F · s = (6 × 4) + (8 × -2) = 24 - 16 = 8 Joules.", "Work and Energy"),
        ("A particle of mass 2 kg moving at 5 m/s collides with and coalesces with a stationary mass of 3 kg. Find the common final velocity.", ["2 m/s", "3 m/s", "1 m/s", "2.5 m/s"], 0, "By momentum conservation: m1 v1 = (m1 + m2) V => 2(5) = (2 + 3) V => 10 = 5V => V = 2 m/s.", "Momentum"),
        ("Find the magnitude of the 3D position vector r = 2i - 3j + 6k.", ["7", "11", "49", "5"], 0, "|r| = √[2² + (-3)² + 6²] = √(4 + 9 + 36) = √49 = 7.", "3D Vectors"),
        ("If vectors A = 2i + j - k and B = i + 2j + 4k are perpendicular (orthogonal), their dot product A · B must equal:", ["0", "1", "-1", "2"], 0, "Two non-zero vectors are perpendicular if and only if their scalar dot product equals zero.", "Vectors")
    ]
    items.extend(calculus_int)
    return make_subject_questions("elective-mathematics", "WASSCE School", items)

print("build_elective_math ready.")
