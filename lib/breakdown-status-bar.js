'use babel';

export default BreakdownStatusBar = (function() {

    return {
        init(statusBar) {
            this.statusBar = statusBar;
            this.element = document.createElement('div');
            this.element.classList.add('breakdown-status', 'inline-block');

            this.blink = document.createElement('span');
            this.blink.style.display = 'none';
            this.blink.style.marginRight = '.5em';
            this.blink.innerHTML = '▼▲';
            this.blink.classList.add('blink', 'success');
            this.element.appendChild(this.blink);

            this.status = document.createElement('span');
            this.element.appendChild(this.status);

            statusBar.addLeftTile({
                item: this.element,
                priority: 500
            });
        },

        destroy() {
            this.element.remove();
        },

        getElement() {
            return this.element;
        },

        pull(status) {
            this.set(status, 'pull');
        },

        push(status) {
            this.set(status, 'push');
        },

        set(status, operation) {
            if (operation == 'push') {
                this.blink.innerHTML = '▲';
            } else if (operation == 'pull') {
                this.blink.innerHTML = '▼';
            } else {
                this.blink.innerHTML = '▼▲';
            }
            if (BreakdownUtil.isFalsy(status)) {
                this.blink.style.display = 'none';
                this.status.innerHTML = '';
            } else {
                if (this.blink.style.display != 'inline') {
                    this.blink.style.display = 'inline';
                }
                this.status.innerHTML = status;
            }
        },

        clear() {
            this.set('');
        }
    };
})();