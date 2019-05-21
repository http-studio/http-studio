// From just-throttle

export default function throttle(fn, interval, callFirst) {
	let wait = false;
	let callNow = false;

	return function() {
		callNow = callFirst && !wait;
		const context = this;
		const args = arguments;
		if (!wait) {
			wait = true;
			setTimeout(() => {
				wait = false;
				if (!callFirst) {
					return fn.apply(context, args);
				}
			}, interval);
		}
		if (callNow) {
			callNow = false;
			return fn.apply(this, arguments);
		}
	};
}
