export interface IRecordState {
    IsActive: boolean;
}

export class RecordState implements IRecordState {
    public IsActive: boolean;
    constructor (IsActive :boolean){
        this.IsActive = IsActive;
    }
}