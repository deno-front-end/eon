export type Props = { name: string };
export default function(this: { message: string, props: Props }, props: Props) {
	this.message = 'Hello World';
	this.props = props;
  return <template>
		<style>{/*css*/`
			div {
				color: red;
			}
		`}</style>
		<div>
		{() => this.props
			&& this.props.name
			&& `Hello ${this.props.name}`
				|| this.message}
		</div>
  </template>
}