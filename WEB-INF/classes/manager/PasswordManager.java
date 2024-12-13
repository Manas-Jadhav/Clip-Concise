package manager;

public class PasswordManager {
    public static String decrypt(String cipherText) {
        int shift = 3;
        StringBuilder plainText = new StringBuilder();

        for (int i = 0; i < cipherText.length(); i++) {
            char ch = cipherText.charAt(i);

            if (Character.isLetter(ch)) {
                char shifted = (char) (ch - shift);

                if ((Character.isLowerCase(ch) && shifted < 'a') ||
                        (Character.isUpperCase(ch) && shifted < 'A')) {
                    shifted = (char) (ch + (26 - shift));
                }
                plainText.append(shifted);
            } else
                plainText.append(ch);
        }
        return plainText.toString();
    }
    public static String encrypt(String plainText) {
        int shift = 3;
        StringBuilder cipherText = new StringBuilder();

        for (int i = 0; i < plainText.length(); i++) {
            char ch = plainText.charAt(i);

            if (Character.isLetter(ch)) {
                char shifted = (char) (ch + shift);

                if ((Character.isLowerCase(ch) && shifted > 'z') ||
                        (Character.isUpperCase(ch) && shifted > 'Z')) {
                    shifted = (char) (ch - (26 - shift));
                }
                cipherText.append(shifted);
            } else
                cipherText.append(ch);
        }
        return cipherText.toString();
    }
}