<template>
<div class="container mt-5">
    <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>
                    <b-link to="sign_in">Login</b-link>
                </td>
            </tr>
            <tr>
                <td>
                    <b-link to="sign_in/forgot_password">Login => Forgot password</b-link>
                </td>
            </tr>
            <tr>
                <td>
                    <b-link to="sign_in/forgot_password/success">Login => Forgot password => Success</b-link>
                </td>
            </tr>
            <tr>
                <td>
                    <b-link to="sign_up">Signup</b-link>
                </td>
            </tr>
            <tr>
                <td>
                    <b-link to="sign_up/plan">Signup => Plan</b-link>
                </td>
            </tr>
            <tr>
                <td>
                    <b-link to="sign_up/plan/billing">Signup => Plan => billing</b-link>
                </td>
            </tr>
            <tr>
                <td>
                    <b-link to="sign_up/plan/billing/success">Signup => Plan => billing => success</b-link>
                </td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script>
export default {
    data() {
        return {
            selected: null,
            options: [{
                    value: null,
                    text: 'Please select some item'
                },
                {
                    value: 'a',
                    text: 'This is First option'
                },
                {
                    value: 'b',
                    text: 'Default Selected Option'
                },
                {
                    value: 'c',
                    text: 'This is another option'
                },
                {
                    value: 'd',
                    text: 'This one is disabled',
                    disabled: true
                }
            ]
        }
    }
}
</script>
