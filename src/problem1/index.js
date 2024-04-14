var sum_to_n_a = function (n) {
  if (n == 1) return 1;
  return n + sum_to_n_c(n - 1);
};

var sum_to_n_b = function (n) {
  return n * (n + 1) / 2;
};

var sum_to_n_c = function (n) {
  let sum = 0;
  for (let i = n; i > 0; i--)
    sum = sum + i;
  return sum;
};