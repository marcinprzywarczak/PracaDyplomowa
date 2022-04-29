<?php

namespace App\Actions\Fortify;

use App\Models\Firm;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Laravel\Fortify\Contracts\CreatesNewUsers;
use Symfony\Component\Console\Output\StreamOutput;

class CreateNewUser implements CreatesNewUsers
{
    use PasswordValidationRules;

    /**
     * Validate and create a newly registered user.
     *
     * @param  array  $input
     * @return \App\Models\User
     */
    public function create(array $input)
    {
        $output = new StreamOutput(fopen('php://stdout', 'w'));
        $output->writeln('test');
        $output->writeln($input);
        Validator::make($input, [
//            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique(User::class),
            ],
            'password' => $this->passwordRules(),
        ])->validate();

        $user = DB::transaction(function () use (&$input){
            if(request()->hasFile('user_avatar'))
                $user_avatar = request()->file('user_avatar')->store('avatars');
            else
                $user_avatar = 'avatars/default_avatar.jpg';

            if($input['isFirmAccount'] === 'true' && request()->hasFile('firm_logo'))
                $firm_logo = request()->file('firm_logo')->store('avatars');
            else
                $firm_logo = 'avatars/default_avatar.jpg';


            if($input['isFirmAccount'] === 'true')
            {
                $firm = Firm::create([
                    'name' => $input['firm_name'],
                    'NIP' => $input['nip'],
                    'REGON' => $input['regon'],
                    'street' => $input['street'],
                    'number' => $input['number'],
                    'zip_code' => $input['zip_code'],
                    'locality' => $input['locality'],
                    'logo' => asset($firm_logo),
                ]);
                return User::create([
                    'first_name' => $input['first_name'],
                    'sure_name' => $input['sure_name'],
                    'firm_id' => $firm->id,
                    'email' => $input['email'],
                    'phone_number' => $input['phone_number'],
                    'password' => Hash::make($input['password']),
                    'avatar' => asset($user_avatar),
                ]);
            }
            else
            {
                return User::create([
                    'first_name' => $input['first_name'],
                    'sure_name' => $input['sure_name'],
                    'email' => $input['email'],
                    'phone_number' => $input['phone_number'],
                    'password' => Hash::make($input['password']),
                    'avatar' => asset($user_avatar),
                ]);
            }
        });
        return $user;
    }
}
