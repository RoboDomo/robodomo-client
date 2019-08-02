
/** BackRoomTabComponent selenium page-object */
class BackRoomTabComponent {
    constructor(parent) {
        this.parent = parent
    }

    get activeTab() { return this.parent.$('.//div[@class="ion-page"]'); }
}

module.exports = new BackRoomTabComponent();
