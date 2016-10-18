export default (amount) => {
  const numSamples = 44100;
  const curve = new Float32Array(numSamples);
  const deg = Math.PI / 180;
  for (let i = 0; i < numSamples; i++) {
    const x = ((i * 2) / numSamples) - 1;
    curve[i] = (((amount + 3) * x * 20 * deg) / ((amount * Math.abs(x)) + Math.PI));
  }
  return curve;
};
