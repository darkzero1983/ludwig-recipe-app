export class IngredientListItem {
	public id: number | null = null;
	public amount: number = null;
	public measurementName: string = '';
	public ingredientName: string = '';

	public isEmpty(): boolean
	{
		return (
			(this.amount == null || this.amount.toString() == "" || this.amount == 0) && 
			(this.ingredientName == null ||this.ingredientName == "") && 
			(this.measurementName == null || this.measurementName == "")
		);
	}
}