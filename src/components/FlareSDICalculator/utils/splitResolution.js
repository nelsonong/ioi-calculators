export default resolution => resolution.match(/\((.*)\)/).pop().split('x').map(number => Number(number));
