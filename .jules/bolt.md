## 2023-10-24 - Variable Evaluation in HyperScript Loops
**Learning:** In HyperScript, loop-like structures such as `show ... when` will re-evaluate expressions on the right side of the condition for every element iterated. Using `my value` directly in the `when` clause causes unnecessary DOM property access during each iteration.
**Action:** Always cache values (like `set val to my value`) before entering loop-like structures in HyperScript to prevent redundant evaluations and improve performance.
