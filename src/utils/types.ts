/**
 * Created by: Oleksandr Bezrukov
 * Creation date: 15 February 2020
 *
 * Declare main types for application.
 */

export type IExtend<T, E> = {
    [P in keyof T]?: T[P];
} & {
    [U in keyof E]: E[U]
};
