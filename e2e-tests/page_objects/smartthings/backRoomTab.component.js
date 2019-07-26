
/** BackRoomTabComponent selenium page-object */
class BackRoomTabComponent {
    get tabContent() { return $('//ion-content//div[@class="ion-page"]'); }
}

module.exports = new BackRoomTabComponent();
