# Secure Shell (SSH)

Learn to use the SSH cryptographic network protocol to connect to other computers.

<!-- slide-include ../../BANNER.md -->

<!-- START doctoc -->
<!-- END doctoc -->



## What is SSH?

<!-- slide-front-matter class: center, middle -->

> SSH is a **cryptographic network protocol** for operating network services **securely over an unsecured network**.

> Its main uses are **remote command-line login** and **securing network services like Git or FTP**.

## Secure channel

SSH establishes a **secure channel** between two computers **over an insecure network** (e.g. a local network or the internet).

<img class='w100' src='images/ssh-secure-channel.png' />

It's a **client-server** protocol.
Using an SSH client, a user (or application) on machine A can connect to an SSH server running on machine B,
either to log in to machine B (with a command line shell) or to execute simple commands.

Establishing and using the secure channel requires a combination of **symmetric encryption**, **asymmetric cryptography** (including a **key exchange** method and **digital signatures**) and **hashing**.

### Symmetric encryption

Symmetric-key algorithms can be used to encrypt communications between two or more parties using a **shared secret**.
[AES][aes] is one such algorithm.

<p class='center'><img class='w80' src='images/symmetric-encryption.png' /></p>

**Assuming all parties possess the secret key**, they can encrypt data, send it over an insecure network, and decrypt it on the other side.
An attacker who intercepts the data **cannot decrypt it without the key** (unless a weakness is found in the algorithm or [its implementation][enigma-operating-shortcomings]).

#### Example: symmetric encryption with AES

> **Windows users using Git Bash** may want to open a new shell with the command `winpty bash` before attempting to reproduce these examples.
> This is because of a [bug in Git Bash](https://github.com/mintty/mintty/issues/540) which causes problems with some interactive commands.

You may encrypt a **plaintext**, in this example the words "too many secrets",
with the [OpenSSL library][openssl] (installed on most computers).
Executing the following command pipeline will prompt you for an encryption key.
They key "changeme" was used in this example:

```bash
$> echo "too many secrets" | openssl aes-256-cbc | openssl enc -base64
enter aes-256-cbc encryption password:
Verifying - enter aes-256-cbc encryption password:
U2FsdGVkX1+Mfeh5m81iMlA7JwiLnq2V2bhJM0yVJqKDjbxLbLLfjJfxtgg2szg3
```

The resulting **ciphertext** cannot be decrypted without the key.
Executing the following command pipeline and entering the same key as before ("changeme") when prompted will decrypt it:

```bash
$> echo "U2FsdGVkX1+Mfeh5m81iMlA7JwiLnq2V2bhJM0yVJqKDjbxLbLLfjJfxtgg2szg3" \
   | openssl enc -d -base64 | openssl aes-256-cbc -d
enter aes-256-cbc decryption password:
too many secrets
```

#### Symmetric encryption over an insecure network

Both parties must possess the shared encryption key.
It used to be **physically transferred**,
for example in the form of the codebooks used to operate the German [Enigma machine][enigma] during World War II.
But that is **impractical for modern computer networks**.
And **sending the key over the insecure network risks it being compromised** by a [Man-in-the-Middle attack][mitm].

<img class='w100' src='images/symmetric-encryption-insecure-network.png' />

### Asymmetric cryptography

[Public-key or asymmetric cryptography][pubkey] is any cryptographic system that uses pairs of keys:
**public keys** which may be disseminated widely, while **private keys** which are known only to the owner.
It has several use cases:

<!-- slide-column -->

**Encryption**

Encrypt and decrypt data.

<img class='w100' src='images/asymmetric-cryptography-encryption.png' />

<!-- slide-column -->

**Key exchange**

Securely exchange shared secret keys.

<img class='w100' src='images/asymmetric-cryptography-key-exchange.png' />

<!-- slide-column -->

**Digital Signatures**

Verify identity and protect against tampering.

<img class='w100' src='images/asymmetric-cryptography-signature.png' />

#### How does asymmetric cryptography work?

There is a mathematical relationship between a public and private key,
based on problems that currently admit no efficient solution
such as [integer factorization][integer-factorization], [discrete logarithm][discrete-logarithm] and [elliptic curve][elliptic-curve] relationships.

Here's a [mathematical example][pubkey-math] based on integer factorization.

Basically, these problems allow a private-public key pair to have the following properties:

* It is easy and **computationally economical to generate a key pair**.
* It is too **computationally expensive to find the private key** from its paired public key.
* Possession of the the private key allows you to solve complex mathematical problems based on the public key,
  thus **proving that you own that public key**.

Effective security only requires keeping the private key private;
**the public key can be openly distributed without compromising security**.

### Asymmetric encryption

<p class='center'><img class='w80' src='images/asymmetric-encryption.png' /></p>

One use case of asymmetric cryptography is **asymmetric encryption**, where the **sender encrypts a message with the recipient's public key**.
The message can only be **decripted by the recipient using the matching private key**.

#### Example: asymmetric encryption with RSA (key pair)

Let's try encryption with [RSA][rsa] this time, an asymmetric algorithm.
To do that, we need to generate a **key pair, i.e. a private and public key**.
The following commands will generate first a private key in a file named `private.pem`,
then a corresponding public key in a file named `public.pem`:

```bash
$> mkdir rsa-example

$> cd rsa-example

$> openssl genrsa -out private.pem 1024
Generating RSA private key, 1024 bit long modulus
.............++++++
.................................++++++
e is 65537 (0x10001)

$> openssl rsa -in private.pem -out public.pem -outform PEM -pubout
writing RSA key

$> ls
private.pem public.pem
```

#### Example: asymmetric encryption with RSA (encryption)

Create a file containing your **plaintext**:

```bash
$> echo 'too many secrets' > plaintext.txt
```

**Encrypt it with the public key** using the OpenSSL library:

```bash
$> openssl rsautl -encrypt -inkey public.pem -pubin \
   -in plaintext.txt -out ciphertext.rsa
```

In addition to your key pair, you should have two additional files containing the plaintext and ciphertext:

```bash
$> ls
ciphertext.rsa plaintext.txt private.pem public.pem
```

#### Example: asymmetric encryption with RSA (decryption)

The ciphertext can now be **decrypted with the corresponding private key**:

```bash
$> openssl rsautl -decrypt -inkey private.pem -in ciphertext.rsa
too many secrets
```

Note that you **cannot decrypt the ciphertext using the public key**:

```bash
$> openssl rsautl -decrypt -inkey public.pem -in ciphertext.rsa
unable to load Private Key [...]
```

Of course, a hacker using **another private key cannot decrypt it either**:

```bash
$> openssl genrsa -out hacker-private.pem 1024
Generating RSA private key, 1024 bit long modulus [...]

$> openssl rsautl -decrypt -inkey hacker-private.pem -in ciphertext.rsa
RSA operation error [...]
```

Hence, you can encrypt data and send it to another party provided that you have their public key.
**No single shared key needs to be exchanged** (the private key remains a secret known only to the recipient).

#### Asymmetric encryption and forward secrecy

Asymmetric encryption protects data sent over an insecure network from attackers,
but **only as long as the private keys remain private**.
It does not provide **forward secrecy**, meaning that if the private keys are compromised in the future,
all data encrypted in the past is also compromised.

<img class='w100' src='images/asymmetric-encryption-forward-secrecy.png' />

### Asymmetric key exchange

So far we learned that:

* Symmetric encryption works but provides no solution
  to the problem of securely transmitting the shared secret key.
* Asymmetric encryption works even better as it does not require a shared secret key,
  but it does not provide forward secrecy.

Additionally, it's important to note that **symmetric encryption is much faster than asymmetric encryption**.
It's also less complex and can easily be implemented as hardware (most modern processors support hardware-accelerated AES encryption).

Ideally, we would want to be able to share a fast symmetric encryption key without transmitting it physically or over the network.
This is where asymmetric cryptography comes to the rescue again.
Encryption is not all it can do; it can also do **key exchange**.

The [Diffie-Hellman Key Exchange][dh], invented in 1976 by Whitfield Diffie and Martin Hellman,
was one of the first public key exchange protocols allowing users to **securely exchange secret keys**
even if an attacker is monitoring the communication channel.

#### Diffie-Hellman key exchange

<!-- slide-column -->

This conceptual diagram illustrates the general idea behind the protocol:

* The two parties, Alice and Bob, agree on an **arbitrary starting color** that is different every time,
  but does not need to be kept secret. Yellow, in this example.
* Each of them selects a **secret color known only to themselves**, in this case orange and blue-green.
* Alice and Bob then **mix their own secret color with the mutually shared color**,
  resulting in orange-tan and light-blue respectively, and **publicly exchange** the two mixed colors.
* Finally, Alice and Bob **mix the color he or she received** from each other **with his or her own private color**.
  The result is a final color mixture (yellow-brown in this case) that is **identical to the partner's final color mixture**,
  and which was never shared publicly.

<!-- slide-column 30 -->

<img class='w100' src='images/dh.png' />

When using large numbers rather than colors, it would be computationally difficult for a third party to determine the secret numbers.

### Man-in-the-Middle attack on Diffie-Hellman

The Diffie-Hellman key exchange solves the problem of transmitting
the shared secret key over the network by computing it using asymmetric cryptography.
It is therefore never transmitted.

However, **a Man-in-the-Middle attack is still possible** if the attacker can position himself
between the two parties to **intercept and relay all communications**.

<img class='w100' src='images/diffie-hellman-mitm.png' />



## TODO

* Introduction
  * What is SSH? (remote login & network services, e.g. Git, SCP, SFTP)
* Public key cryptography reminder
* Authentication methods
  * Password
  * Public key
* Security (known hosts)
* Key management (local & remote)
* Other uses (tunneling)



## References

* [How does SSH Work](https://www.hostinger.com/tutorials/ssh-tutorial-how-does-ssh-work)
* [Demystifying Symmetric and Asymmetric Methods of Encryption](https://www.cheapsslshop.com/blog/demystifying-symmetric-and-asymmetric-methods-of-encryption)
* [Diffie-Hellman Key Exchange][dh]
* [Simplest Explanation of the Math Behind Public Key Cryptography][pubkey-math]



[aes]: https://en.wikipedia.org/wiki/Advanced_Encryption_Standard
[dh]: https://en.wikipedia.org/wiki/Diffie%E2%80%93Hellman_key_exchange
[discrete-logarithm]: https://en.wikipedia.org/wiki/Discrete_logarithm
[elliptic-curve]: https://en.wikipedia.org/wiki/Elliptic-curve_cryptography
[enigma]: https://en.wikipedia.org/wiki/Enigma_machine#Operation
[enigma-operating-shortcomings]: https://en.wikipedia.org/wiki/Cryptanalysis_of_the_Enigma#Operating_shortcomings
[forward-secrecy]: https://en.wikipedia.org/wiki/Forward_secrecy
[integer-factorization]: https://en.wikipedia.org/wiki/Integer_factorization
[key-exchange]: https://en.wikipedia.org/wiki/Key_exchange
[mitm]: https://en.wikipedia.org/wiki/Man-in-the-middle_attack
[openssl]: https://www.openssl.org
[pubkey]: https://en.wikipedia.org/wiki/Public-key_cryptography
[pubkey-math]: https://www.onebigfluke.com/2013/11/public-key-crypto-math-explained.html
[rsa]: https://en.wikipedia.org/wiki/RSA_(cryptosystem)
