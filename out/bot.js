class Bot {
    constructor() {
        this.commands = new Map();
    }
    on(ev, func) {
        if (ev === 'ready')
            func(this);
        if (ev === 'message') {
            const box = document.getElementById('input');
            box.addEventListener('submit', () => {
                func({
                    content: box.value
                });
            });
        }
    }
}
export default Bot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYm90LmpzIiwic291cmNlUm9vdCI6Ii4vc3JjLyIsInNvdXJjZXMiOlsiYm90LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE1BQU0sR0FBRztJQUFUO1FBQ0UsYUFBUSxHQUFHLElBQUksR0FBRyxFQUF1QixDQUFBO0lBZTNDLENBQUM7SUFYQyxFQUFFLENBQUUsRUFBVSxFQUFFLElBQXVCO1FBQ3JDLElBQUksRUFBRSxLQUFLLE9BQU87WUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDOUIsSUFBSSxFQUFFLEtBQUssU0FBUyxFQUFFO1lBQ3BCLE1BQU0sR0FBRyxHQUFxQixRQUFRLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBcUIsQ0FBQTtZQUNsRixHQUFHLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDbEMsSUFBSSxDQUFDO29CQUNILE9BQU8sRUFBRSxHQUFHLENBQUMsS0FBSztpQkFDbkIsQ0FBQyxDQUFBO1lBQ0osQ0FBQyxDQUFDLENBQUE7U0FDSDtJQUNMLENBQUM7Q0FDQTtBQVVELGVBQWUsR0FBRyxDQUFBIn0=