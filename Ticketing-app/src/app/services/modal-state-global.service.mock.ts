export class ModalStateGlobalStubService {
    public modals: {
        [key: string]: boolean,
      } = {
        createBoardModal: false
      }

      openModal(key: string, id?: number) {
        const targetKey = id ? `${key}-${id}` : key;
        this.modals[targetKey] = true;
      }
      closeModal(key: string, id?: number) {
        const targetKey = id ? `${key}-${id}` : key;
        this.modals[targetKey] = false;
      }
}