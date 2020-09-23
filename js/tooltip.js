/*----------------------------------------------------*/
/*
	app-tooltip
	version: 0.0.1
	autor: niver quispe acuña
	github: https://github.com/niver01?tab=repositories
*/
/*----------------------------------------------------*/

/**
 * calcula posición de tooltip
 * @param {string} position bottom | top | left | right
 * @param {number} margin
 * @param {HTMLElement} tooltip
 * @param {HTMLElement} container elemento donde el tooltip se mostrara
 */
const postionTooltip = (position, margin, tooltip, container) => {
	let left, top;

	switch (position) {
		case 'bottom':
			left = parseFloat(container.offsetLeft + container.offsetWidth / 2 - tooltip.offsetWidth / 2);
			top = parseFloat(container.offsetTop + container.offsetHeight + margin * 4);
			break;

		case 'top':
			left = parseFloat(container.offsetLeft + container.offsetWidth / 2 - tooltip.offsetWidth / 2);
			top = parseFloat(container.offsetTop - tooltip.offsetHeight - margin * 4);
			break;

		case 'left':
			left = parseFloat(container.offsetLeft - tooltip.offsetWidth - margin * 4);
			top = parseFloat(container.offsetTop + container.offsetHeight / 2 - tooltip.offsetHeight / 2);
			break;

		case 'right':
			left = parseFloat(container.offsetLeft + container.offsetWidth + margin * 4);
			top = parseFloat(container.offsetTop + container.offsetHeight / 2 - tooltip.offsetHeight / 2);
			break;

		default:
			break;
	}

	return {
		top,
		left,
	};
};

/**
 * AppTooltip
 */
class AppTooltip {
	/**
	 * init
	 * @param {NodeList} elems
	 * @param {object} options
	 */
	static init(elems, options = {}) {
		try {
			let { position = 'bottom', margin = 10 } = options,
				template = '';

			elems.forEach((elem) => {
				const tooltipDiv = document.createElement('div'),
					dataSet = elem.dataset,
					dataTooltip = dataSet.apptooltip ? dataSet.apptooltip : '',
					dataTooltipTitle = dataSet.apptooltiptitle ? dataSet.apptooltiptitle : '',
					dataTooltipImage = dataSet.apptooltipimage ? dataSet.apptooltipimage : '',
					position = dataSet.apptooltipposition
						? dataSet.apptooltipposition
						: options.position
						? options.position
						: 'bottom';

				if (dataTooltipTitle && dataTooltipImage) {
					template = `<div class="app-tooltip__content">
                                            <figure class="app-tooltip__figure">
                                                <img src="${dataTooltipImage}" alt="${dataTooltipImage}" class="app-tooltip__image" />
                                            </figure>
                                        <article class="app-tooltip__description">
                                            <h4 class="app-tooltip__description__title">${dataTooltipTitle}</h4>
                                            <p>
                                                ${dataTooltip}
                                            </p>
                                        </article>
                                        </div>`;
				} else if (dataTooltipTitle && !dataTooltipImage) {
					template = `<div class="app-tooltip__content">
                                <article class="app-tooltip__description">
                                    <h4 class="app-tooltip__description__title">${dataTooltipTitle}</h4>
                                    <p>
                                        ${dataTooltip}
                                    </p>
                                </article>
                            </div>`;
				} else {
					template = `<div class="app-tooltip__content">
                                ${dataTooltip}
                            </div>`;
				}

				tooltipDiv.classList.add('app-tooltip');
				tooltipDiv.innerHTML = template;
				document.body.append(tooltipDiv);

				const { left, top } = postionTooltip(position, margin, tooltipDiv, elem);
				tooltipDiv.style.left = `${left}px`;
				tooltipDiv.style.top = `${top}px`;

				elem.addEventListener('mouseenter', function () {
					const { left, top } = postionTooltip(position, margin, tooltipDiv, this);
					tooltipDiv.style.left = `${left}px`;
					tooltipDiv.style.top = `${top}px`;

					switch (position) {
						case 'bottom':
							tooltipDiv.style.transform = `translateX(0px) translateY(-${(margin / 1.4) * 4}px)`;
							break;

						case 'top':
							tooltipDiv.style.transform = `translateX(0px) translateY(${(margin / 1.4) * 4}px)`;
							break;

						case 'left':
							tooltipDiv.style.transform = `translateX(${(margin / 1.4) * 4}px) translateY(0px)`;
							break;

						case 'right':
							tooltipDiv.style.transform = `translateX(-${(margin / 1.4) * 4}px) translateY(0px)`;
							break;

						default:
							break;
					}

					tooltipDiv.style.opacity = '1';
					tooltipDiv.style.visibility = 'visible';
				});

				elem.addEventListener('mouseleave', function () {
					tooltipDiv.style.transform = 'translateX(0px) translateY(0px) ';
					tooltipDiv.style.opacity = '0';
					tooltipDiv.style.visibility = 'hidden';
				});
			});
		} catch (error) {
			console.error('error en -> ' + error);
		}
	}
}

AppTooltip.init(document.querySelectorAll('.tooltip'));
// AppTooltip.init(document.querySelectorAll('.tooltip'), { position: 'left', margin: 10 });
// AppTooltip.init(document.querySelectorAll('.tooltip'), { position: 'left' });
// AppTooltip.init(document.querySelectorAll('.tooltip'), { margin: 10 });
