# 🎮 Fallback 🚀

## 📌 Descripción
Bienvenido al ejercicio CTF de Fallback. El objetivo aquí es simple: convertirse en el dueño del contrato inteligente y retirar los fondos.

## 💡 Solución
Al igual que en el ejercicio anterior, comencé por comprender la estructura del contrato. Me centré especialmente en la función de fallback y en la función `contribute`, que me permitiría cambiar el propietario (`owner`) del contrato si mi contribución era más alta que la del propietario actual.

Primero, utilicé la función `contribute` para enviar una pequeña cantidad de Ether al contrato. Este paso es crucial porque la función de fallback requiere que haya hecho una contribución previa para poder cambiar el `owner`.

Después de verificar que la transacción fue exitosa, procedí a enviar fondos directamente a la dirección del contrato. Esto activó la función de fallback, que cambió el propietario del contrato a mi dirección, ya que había cumplido con la condición de haber hecho una contribución previa.

Finalmente, como nuevo `owner`, utilicé la función `withdraw` para reclamar todos los fondos del contrato.

El ejercicio demuestra lo crítico que es entender y diseñar cuidadosamente las funciones de fallback en contratos inteligentes para prevenir vulnerabilidades de seguridad.

### Fragmento de Código

```ts
const main = async () => {
  // Contribuir al contrato
  await fallback.contribute({ value: amountToSend });

  // Enviar fondos directamente para activar el fallback
  await deployer.sendTransaction({ to: contractAddress, value: amountToSend });

  // Retirar fondos como nuevo dueño
  await fallback.withdraw();
};
```

Después de ejecutar este script, me convertí en el nuevo dueño y retiré los fondos exitosamente.

# 🎮 Fallback 🚀

## 📌 Description
Welcome to the Fallback CTF exercise. The goal here is straightforward: become the owner of the smart contract and withdraw the funds.

## 💡 Solution
Just like in the previous exercise, I started by understanding the contract's structure. I particularly focused on the fallback function and the `contribute` function, which would allow me to change the contract's owner if my contribution was higher than that of the current owner.

First, I used the `contribute` function to send a small amount of Ether to the contract. This step is crucial because the fallback function requires that I have made a previous contribution in order to change the owner.

After verifying that the transaction was successful, I proceeded to send funds directly to the contract's address. This triggered the fallback function, which changed the contract's owner to my address, as I had met the condition of making a previous contribution.

Finally, as the new owner, I used the `withdraw` function to claim all the funds from the contract.

The exercise demonstrates how critical it is to understand and carefully design fallback functions in smart contracts to prevent security vulnerabilities.

### Code Snippet

```ts
const main = async () => {
  // Contribute to the contract
  await fallback.contribute({ value: amountToSend });

  // Send funds directly to trigger the fallback
  await deployer.sendTransaction({ to: contractAddress, value: amountToSend });

  // Withdraw funds as the new owner
  await fallback.withdraw();
};
```

After running this script, I became the new owner and successfully withdrew the funds.
