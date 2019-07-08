const onOrOff = () => (Math.random() < 0.5 ? "off" : "on");

const randomTemp = () => Math.floor(Math.random() * 60 + 60);

const randomPositive = max => Math.ceil(Math.random() * max);

export { onOrOff, randomTemp, randomPositive };
