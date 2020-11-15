export type Props = { name: string };
export default function(this: Eon<{ message: string; }>, props: Props) {
  this.message = 'Hello World';
  return <template>
		<style>{/*css*/` div { color: red; } `}</style>
		<div>
			{() => props
				&& props.name
				&& `Hello ${props.name}`
					|| this.message}
		</div>
  </template>
}